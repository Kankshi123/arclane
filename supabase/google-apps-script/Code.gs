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
 * Handle incoming POST requests from the Arclane backend.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 30 seconds for other processes to finish to prevent race conditions / duplicate row anomalies
  lock.tryLock(30000);

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        success: false,
        error: 'Invalid request: No payload received.'
      }, 400);
    }

    var payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return createJsonResponse({
        success: false,
        error: 'Invalid request: Failed to parse JSON.'
      }, 400);
    }

    // 1. Validate Shared Secret (from Script Properties)
    var scriptProperties = PropertiesService.getScriptProperties();
    var configuredSecret = scriptProperties.getProperty('ARCLANE_WEBHOOK_SECRET');

    // Extract secret from payload or query params
    var incomingSecret = payload.secret || (e.parameter && e.parameter.secret) || '';

    if (configuredSecret && configuredSecret.trim() !== '') {
      if (incomingSecret !== configuredSecret) {
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

    if (!name || !email || !company || !service || !message) {
      return createJsonResponse({
        success: false,
        error: 'Missing required enquiry fields.'
      }, 422);
    }

    // 3. Open Spreadsheet and Worksheet
    var spreadsheetId = scriptProperties.getProperty('SPREADSHEET_ID');
    var spreadsheet;

    if (spreadsheetId && spreadsheetId.trim() !== '') {
      spreadsheet = SpreadsheetApp.openById(spreadsheetId.trim());
    } else {
      spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    }

    if (!spreadsheet) {
      return createJsonResponse({
        success: false,
        error: 'Could not access the Google Spreadsheet.'
      }, 500);
    }

    var sheetName = 'Enquiries';
    var sheet = spreadsheet.getSheetByName(sheetName);

    // If sheet doesn't exist, create it and add headers
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
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

    // 4. Generate Server-Side Timestamp
    var timezone = spreadsheet.getSpreadsheetTimeZone() || 'GMT';
    var now = new Date();
    var formattedDate = Utilities.formatDate(now, timezone, 'yyyy-MM-dd HH:mm:ss');

    // 5. Append Single Row
    // Columns: Date & Time | Name | Work Email | Company | Phone | Service / Focus Area | Message | Status
    sheet.appendRow([
      formattedDate,
      name,
      email,
      company,
      phone || '-',
      service,
      message,
      'New'
    ]);

    return createJsonResponse({
      success: true,
      message: 'Enquiry recorded successfully.'
    }, 200);

  } catch (err) {
    return createJsonResponse({
      success: false,
      error: 'An internal error occurred while saving the enquiry.'
    }, 500);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Handle GET requests for simple health check
 */
function doGet(e) {
  return createJsonResponse({
    status: 'online',
    service: 'Arclane Global Enquiries Web App',
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
