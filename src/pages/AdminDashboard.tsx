import { useEffect, useState, useMemo } from 'react'
import { AdminShell } from '../components/admin/AdminShell'
import { signOut } from '../services/authService'
import { supabase } from '../lib/supabase'

export interface EnquiryRecord {
  id: string
  name: string
  work_email: string
  company: string
  phone?: string | null
  focus_area: string
  message: string
  status: 'new' | 'contacted' | 'archived' | string
  created_at: string
}

export function AdminDashboard() {
  const [email, setEmail] = useState<string | null>(null)
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'enquiries'>('dashboard')
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'archived'>('all')
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    supabase?.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null))
    fetchEnquiries()
  }, [])

  const fetchEnquiries = async () => {
    if (!supabase) {
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setEnquiries(data as EnquiryRecord[])
      }
    } catch (err) {
      console.error('[Admin] Error fetching enquiries:', err)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    await signOut()
    window.location.replace('/admin/login')
  }

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    if (!supabase) return
    setUpdatingId(id)
    try {
      const { error } = await supabase
        .from('enquiries')
        .update({ status: newStatus })
        .eq('id', id)

      if (!error) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        )
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null))
        }
      }
    } catch (err) {
      console.error('[Admin] Error updating status:', err)
    } finally {
      setUpdatingId(null)
    }
  }

  // Metrics
  const totalCount = enquiries.length
  const newCount = enquiries.filter((e) => e.status === 'new').length
  const contactedCount = enquiries.filter((e) => e.status === 'contacted').length
  const archivedCount = enquiries.filter((e) => e.status === 'archived').length

  // Filtered Enquiries for Enquiries Tab
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((e) => {
      const matchesStatus =
        statusFilter === 'all' || e.status?.toLowerCase() === statusFilter.toLowerCase()

      const query = searchQuery.trim().toLowerCase()
      const matchesQuery =
        !query ||
        e.name?.toLowerCase().includes(query) ||
        e.company?.toLowerCase().includes(query) ||
        e.work_email?.toLowerCase().includes(query) ||
        e.focus_area?.toLowerCase().includes(query) ||
        e.message?.toLowerCase().includes(query)

      return matchesStatus && matchesQuery
    })
  }, [enquiries, statusFilter, searchQuery])

  // Recent Enquiries for Dashboard Tab (Top 5)
  const recentEnquiries = useMemo(() => {
    return enquiries.slice(0, 6)
  }, [enquiries])

  const formatDate = (isoString?: string) => {
    if (!isoString) return '—'
    try {
      const date = new Date(isoString)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return isoString
    }
  }

  return (
    <AdminShell
      email={email}
      currentTab={currentTab}
      onTabChange={setCurrentTab}
      totalEnquiries={totalCount}
      newEnquiries={newCount}
      onLogout={logout}
    >
      {currentTab === 'dashboard' ? (
        /* ============================================================
           DASHBOARD VIEW
           ============================================================ */
        <div className="admin-page-content">
          {/* DASHBOARD HERO */}
          <section className="admin-hero-card">
            <div className="admin-hero-content">
              <span className="admin-eyebrow">ARCLANE / ADMIN</span>
              <h1 className="admin-page-title">Dashboard</h1>
              <p className="admin-page-subtext">
                Enquiry management workspace and strategic pipeline overview.
              </p>
            </div>
            <div className="admin-hero-badge">
              <span className="admin-live-dot" />
              <span>LIVE SYSTEM</span>
            </div>
          </section>

          {/* STAT METRICS */}
          <section className="admin-stats-grid" aria-label="Key Performance Indicators">
            <article className="admin-stat-card">
              <span className="admin-stat-label">TOTAL ENQUIRIES</span>
              <strong className="admin-stat-number">{loading ? '…' : totalCount}</strong>
              <p className="admin-stat-caption">All incoming submissions to date</p>
            </article>

            <article className="admin-stat-card is-highlight">
              <span className="admin-stat-label">NEW / ACTION REQUIRED</span>
              <strong className="admin-stat-number admin-accent-number">{loading ? '…' : newCount}</strong>
              <p className="admin-stat-caption">Pending initial response</p>
            </article>

            <article className="admin-stat-card">
              <span className="admin-stat-label">CONTACTED</span>
              <strong className="admin-stat-number">{loading ? '…' : contactedCount}</strong>
              <p className="admin-stat-caption">In discussion or handled</p>
            </article>
          </section>

          {/* RECENT ACTIVITY SECTION */}
          <section className="admin-section-card">
            <div className="admin-section-header">
              <div>
                <span className="admin-eyebrow">RECENT ENQUIRIES</span>
                <h2 className="admin-section-title">Latest activity</h2>
              </div>
              <button
                type="button"
                className="admin-view-all-btn"
                onClick={() => setCurrentTab('enquiries')}
              >
                <span>View all ({totalCount})</span>
                <span className="admin-arrow-icon" aria-hidden="true">→</span>
              </button>
            </div>

            {loading ? (
              <div className="admin-loading-state">
                <span className="admin-spinner" />
                <p>Loading recent submissions…</p>
              </div>
            ) : recentEnquiries.length === 0 ? (
              <div className="admin-empty-state">
                <div className="admin-empty-icon" aria-hidden="true">∅</div>
                <strong>No enquiries yet.</strong>
                <p>New enquiries submitted through the public website will appear here in real-time.</p>
              </div>
            ) : (
              <div className="admin-enquiry-list" role="list">
                {recentEnquiries.map((item) => (
                  <div
                    key={item.id}
                    className="admin-enquiry-row"
                    onClick={() => setSelectedEnquiry(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setSelectedEnquiry(item)
                      }
                    }}
                  >
                    <div className="admin-row-primary">
                      <strong className="admin-row-name">{item.name}</strong>
                      <span className="admin-row-company">{item.company}</span>
                    </div>

                    <div className="admin-row-email">
                      <span>{item.work_email}</span>
                      {item.phone && <small>{item.phone}</small>}
                    </div>

                    <div className="admin-row-focus">
                      <span className="admin-focus-badge">{item.focus_area}</span>
                    </div>

                    <div className="admin-row-status">
                      <span className={`admin-status-pill status-${item.status || 'new'}`}>
                        {item.status || 'new'}
                      </span>
                    </div>

                    <div className="admin-row-date">
                      <span>{formatDate(item.created_at)}</span>
                    </div>

                    <div className="admin-row-action">
                      <span className="admin-row-arrow" aria-hidden="true">↗</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      ) : (
        /* ============================================================
           ENQUIRIES EXPLORER VIEW
           ============================================================ */
        <div className="admin-page-content">
          {/* ENQUIRIES HERO */}
          <section className="admin-hero-card">
            <div className="admin-hero-content">
              <span className="admin-eyebrow">ARCLANE / ENQUIRIES</span>
              <h1 className="admin-page-title">Client Enquiries</h1>
              <p className="admin-page-subtext">
                Explore, filter, and respond to incoming inquiries from prospective partners.
              </p>
            </div>
            <button
              type="button"
              className="admin-refresh-btn"
              onClick={fetchEnquiries}
              title="Refresh enquiries"
            >
              <span>REFRESH DATA</span>
              <span className="admin-arrow-icon" aria-hidden="true">↻</span>
            </button>
          </section>

          {/* FILTERS & SEARCH TOOLBAR */}
          <section className="admin-toolbar-card">
            <div className="admin-search-wrapper">
              <span className="admin-search-icon" aria-hidden="true">⌕</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, company, email, or message..."
                className="admin-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="admin-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <div className="admin-filter-tabs" role="tablist" aria-label="Status filter">
              <button
                type="button"
                className={`admin-filter-tab ${statusFilter === 'all' ? 'is-active' : ''}`}
                onClick={() => setStatusFilter('all')}
              >
                All <span>({totalCount})</span>
              </button>
              <button
                type="button"
                className={`admin-filter-tab ${statusFilter === 'new' ? 'is-active' : ''}`}
                onClick={() => setStatusFilter('new')}
              >
                New <span>({newCount})</span>
              </button>
              <button
                type="button"
                className={`admin-filter-tab ${statusFilter === 'contacted' ? 'is-active' : ''}`}
                onClick={() => setStatusFilter('contacted')}
              >
                Contacted <span>({contactedCount})</span>
              </button>
              <button
                type="button"
                className={`admin-filter-tab ${statusFilter === 'archived' ? 'is-active' : ''}`}
                onClick={() => setStatusFilter('archived')}
              >
                Archived <span>({archivedCount})</span>
              </button>
            </div>
          </section>

          {/* ENQUIRIES TABLE / LIST */}
          <section className="admin-section-card">
            {loading ? (
              <div className="admin-loading-state">
                <span className="admin-spinner" />
                <p>Loading enquiries database…</p>
              </div>
            ) : filteredEnquiries.length === 0 ? (
              <div className="admin-empty-state">
                <div className="admin-empty-icon" aria-hidden="true">∅</div>
                <strong>No enquiries found.</strong>
                <p>
                  {searchQuery || statusFilter !== 'all'
                    ? 'Try adjusting your search query or status filter.'
                    : 'Enquiries submitted through the website will appear here.'}
                </p>
              </div>
            ) : (
              <div className="admin-table-container">
                <div className="admin-table-header" aria-hidden="true">
                  <span>CONTACT / COMPANY</span>
                  <span>COMMUNICATION</span>
                  <span>FOCUS AREA</span>
                  <span>STATUS</span>
                  <span>DATE</span>
                  <span>ACTIONS</span>
                </div>

                <div className="admin-enquiry-list">
                  {filteredEnquiries.map((item) => (
                    <div
                      key={item.id}
                      className="admin-enquiry-row"
                      onClick={() => setSelectedEnquiry(item)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setSelectedEnquiry(item)
                        }
                      }}
                    >
                      <div className="admin-row-primary">
                        <strong className="admin-row-name">{item.name}</strong>
                        <span className="admin-row-company">{item.company}</span>
                      </div>

                      <div className="admin-row-email">
                        <span>{item.work_email}</span>
                        {item.phone && <small>{item.phone}</small>}
                      </div>

                      <div className="admin-row-focus">
                        <span className="admin-focus-badge">{item.focus_area}</span>
                      </div>

                      <div className="admin-row-status">
                        <span className={`admin-status-pill status-${item.status || 'new'}`}>
                          {item.status || 'new'}
                        </span>
                      </div>

                      <div className="admin-row-date">
                        <span>{formatDate(item.created_at)}</span>
                      </div>

                      <div className="admin-row-action" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          className="admin-quick-view-btn"
                          onClick={() => setSelectedEnquiry(item)}
                          aria-label={`View details for ${item.name}`}
                        >
                          View Details ↗
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {/* ============================================================
         ENQUIRY DETAIL MODAL / DRAWER
         ============================================================ */}
      {selectedEnquiry && (
        <div
          className="admin-modal-overlay"
          onClick={() => setSelectedEnquiry(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-enquiry-title"
        >
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-head">
              <div>
                <span className="admin-eyebrow">ENQUIRY RECORD</span>
                <h3 id="modal-enquiry-title" className="admin-modal-title">
                  {selectedEnquiry.name}
                </h3>
                <p className="admin-modal-sub">{selectedEnquiry.company}</p>
              </div>
              <button
                type="button"
                className="admin-modal-close"
                onClick={() => setSelectedEnquiry(null)}
                aria-label="Close enquiry detail"
              >
                ×
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-modal-grid">
                <div className="admin-modal-field">
                  <span className="admin-modal-label">WORK EMAIL</span>
                  <a
                    href={`mailto:${selectedEnquiry.work_email}`}
                    className="admin-modal-link"
                  >
                    {selectedEnquiry.work_email} ↗
                  </a>
                </div>

                <div className="admin-modal-field">
                  <span className="admin-modal-label">PHONE</span>
                  <p className="admin-modal-value">{selectedEnquiry.phone || 'Not provided'}</p>
                </div>

                <div className="admin-modal-field">
                  <span className="admin-modal-label">FOCUS AREA</span>
                  <span className="admin-focus-badge">{selectedEnquiry.focus_area}</span>
                </div>

                <div className="admin-modal-field">
                  <span className="admin-modal-label">SUBMITTED ON</span>
                  <p className="admin-modal-value">{formatDate(selectedEnquiry.created_at)}</p>
                </div>
              </div>

              <div className="admin-modal-message-section">
                <span className="admin-modal-label">MESSAGE / ENQUIRY DETAIL</span>
                <div className="admin-modal-message-box">
                  <p>{selectedEnquiry.message}</p>
                </div>
              </div>

              <div className="admin-modal-actions-section">
                <span className="admin-modal-label">STATUS MANAGEMENT</span>
                <div className="admin-modal-status-buttons">
                  <button
                    type="button"
                    className={`admin-status-btn ${selectedEnquiry.status === 'new' ? 'is-current' : ''}`}
                    onClick={() => handleUpdateStatus(selectedEnquiry.id, 'new')}
                    disabled={updatingId === selectedEnquiry.id}
                  >
                    Mark as New
                  </button>
                  <button
                    type="button"
                    className={`admin-status-btn ${selectedEnquiry.status === 'contacted' ? 'is-current' : ''}`}
                    onClick={() => handleUpdateStatus(selectedEnquiry.id, 'contacted')}
                    disabled={updatingId === selectedEnquiry.id}
                  >
                    Mark as Contacted
                  </button>
                  <button
                    type="button"
                    className={`admin-status-btn ${selectedEnquiry.status === 'archived' ? 'is-current' : ''}`}
                    onClick={() => handleUpdateStatus(selectedEnquiry.id, 'archived')}
                    disabled={updatingId === selectedEnquiry.id}
                  >
                    Archive
                  </button>
                </div>
              </div>
            </div>

            <div className="admin-modal-foot">
              <a
                href={`mailto:${selectedEnquiry.work_email}?subject=${encodeURIComponent(
                  `Arclane Global // Response to your enquiry regarding ${selectedEnquiry.focus_area}`
                )}`}
                className="admin-modal-primary-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>REPLY VIA EMAIL</span>
                <span className="admin-arrow-icon" aria-hidden="true">↗</span>
              </a>
              <button
                type="button"
                className="admin-modal-secondary-btn"
                onClick={() => setSelectedEnquiry(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  )
}
