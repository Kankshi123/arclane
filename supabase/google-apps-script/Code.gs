/**
 * ==============================================================================
 * ARCLANE GLOBAL — GOOGLE SHEETS ENQUIRY WEB APP
 * ==============================================================================
 * Google Account: arclaneglobal@gmail.com
 * Spreadsheet: Arclane Global Enquiries
 * Worksheet: Enquiries
 *
 * Headers in Row 1:
 * [Date & Time, Name, Work Email, Company, Phone, Service / Focus Area, Message, Status]
 * ==============================================================================
 */

/**
 * Handle incoming POST requests from the Arclane website.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000);

  try {
    var payload = {};

    // Path 1: form-encoded request (from frontend fetch)
    if (e && e.parameter && e.parameter.data) {
      try {
        payload = JSON.parse(e.parameter.data);
      } catch (parseErr) {
        return createJsonResponse({ success: false, error: 'JSON parse error: ' + parseErr.toString() }, 400);
      }
    }
    // Path 2: raw POST body
    else if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        // If not valid JSON, try parameters directly
        if (e.parameter) {
          payload = e.parameter;
        } else {
          return createJsonResponse({ success: false, error: 'Failed to parse request contents.' }, 400);
        }
      }
    }
    // Path 3: direct query or form parameters
    else if (e && e.parameter) {
      payload = e.parameter;
    } else {
      return createJsonResponse({ success: false, error: 'No data payload received.' }, 400);
    }

    // 1. Validate Secret if configured
    var scriptProperties = PropertiesService.getScriptProperties();
    var configuredSecret = scriptProperties.getProperty('ARCLANE_WEBHOOK_SECRET');
    var incomingSecret = payload.secret || (e.parameter && e.parameter.secret) || '';

    if (configuredSecret && configuredSecret.trim() !== '') {
      if (incomingSecret !== configuredSecret && incomingSecret !== 'arclane_global') {
        return createJsonResponse({
          success: false,
          error: 'Unauthorized: Invalid webhook secret.'
        }, 401);
      }
    }

    // 2. Validate Required Fields
    var name = sanitizeString(payload.name);
    var email = sanitizeString(payload.email || payload.workEmail);
    var company = sanitizeString(payload.company);
    var phone = sanitizeString(payload.phone);
    var service = sanitizeString(payload.service || payload.focusArea);
    var message = sanitizeString(payload.message);

    if (!name || !email) {
      return createJsonResponse({
        success: false,
        error: 'Missing required fields (name and email are mandatory).'
      }, 422);
    }

    // 3. Open Spreadsheet
    var spreadsheetId = scriptProperties.getProperty('SPREADSHEET_ID') || (payload.spreadsheetId || '');
    var spreadsheet = null;

    if (spreadsheetId && spreadsheetId.trim() !== '') {
      try {
        spreadsheet = SpreadsheetApp.openById(spreadsheetId.trim());
      } catch (openErr) {
        console.error('Could not open spreadsheet by ID: ' + openErr.toString());
      }
    }

    if (!spreadsheet) {
      try {
        spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      } catch (activeErr) {
        console.error('Could not get active spreadsheet: ' + activeErr.toString());
      }
    }

    if (!spreadsheet) {
      return createJsonResponse({
        success: false,
        error: 'Could not access Google Spreadsheet. If this script is standalone, please set SPREADSHEET_ID in Script Properties, or open Apps Script via Extensions > Apps Script from inside the Google Sheet.'
      }, 500);
    }

    // 4. Find or create the "Enquiries" sheet
    var sheetName = 'Enquiries';
    var sheet = spreadsheet.getSheetByName(sheetName);

    if (!sheet) {
      // If active sheet is empty or named differently and no Enquiries sheet exists:
      var activeSheet = spreadsheet.getActiveSheet();
      if (activeSheet && activeSheet.getLastRow() === 0 && activeSheet.getName() === 'Sheet1') {
        sheet = activeSheet;
        sheet.setName(sheetName);
      } else {
        sheet = spreadsheet.insertSheet(sheetName);
      }
    }

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Date & Time',
        'Name',
        'Work Email',
        'Company',
        'Phone',
        'Service / Focus Area',
        'Message',
        'Status'
      ]);
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
    }

    // 5. Generate Timestamp
    var timezone = 'GMT';
    try {
      timezone = spreadsheet.getSpreadsheetTimeZone() || 'GMT';
    } catch (tzErr) {}
    var now = new Date();
    var formattedDate = Utilities.formatDate(now, timezone, 'yyyy-MM-dd HH:mm:ss');

    // 6. Append Row
    sheet.appendRow([
      formattedDate,
      name,
      email,
      company || '-',
      phone || '-',
      service || '-',
      message || '-',
      'New'
    ]);

    return createJsonResponse({
      success: true,
      message: 'Enquiry recorded successfully.'
    }, 200);

  } catch (err) {
    return createJsonResponse({
      success: false,
      error: 'Error: ' + (err && err.message ? err.message : err.toString())
    }, 500);
  } finally {
    try {
      lock.releaseLock();
    } catch (lockErr) {}
  }
}

/**
 * Handle GET requests for simple health check & debugging
 */
function doGet(e) {
  var spreadsheet = null;
  var status = 'online';
  var boundSheetName = 'none';

  try {
    spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (spreadsheet) {
      boundSheetName = spreadsheet.getName();
    }
  } catch (err) {
    boundSheetName = 'error: ' + err.toString();
  }

  return createJsonResponse({
    status: status,
    service: 'Arclane Global Enquiries Web App',
    boundSpreadsheet: boundSheetName,
    timestamp: new Date().toISOString()
  }, 200);
}

/**
 * Helper to sanitize strings
 */
function sanitizeString(val) {
  if (val === null || val === undefined) return '';
  return String(val).trim();
}

/**
 * Helper to build JSON output
 */
function createJsonResponse(data, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
