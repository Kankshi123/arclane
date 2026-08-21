import type { ReactNode } from 'react'

export interface AdminShellProps {
  email?: string | null
  currentTab?: 'dashboard' | 'enquiries'
  onTabChange?: (tab: 'dashboard' | 'enquiries') => void
  totalEnquiries?: number
  newEnquiries?: number
  onLogout: () => void
  children: ReactNode
}

export function AdminShell({
  email,
  currentTab = 'dashboard',
  onTabChange,
  totalEnquiries,
  newEnquiries,
  onLogout,
  children,
}: AdminShellProps) {
  return (
    <div className="admin-root">
      {/* TOP HEADER */}
      <header className="admin-header">
        <div className="admin-header-left">
          <a href="/admin" className="admin-wordmark" aria-label="Arclane Admin Home">
            ARCLANE <i className="admin-wordmark-accent">ADMIN</i>
          </a>
          <span className="admin-header-tag">INTERNAL PORTAL</span>
        </div>

        <div className="admin-header-actions">
          <a href="/" className="admin-site-link" target="_blank" rel="noopener noreferrer">
            <span>PUBLIC SITE</span>
            <span className="admin-arrow-icon" aria-hidden="true">↗</span>
          </a>
          <div className="admin-user-pill" title={email ?? 'Authenticated Admin'}>
            <span className="admin-user-dot" aria-hidden="true" />
            <span className="admin-user-email">{email ?? 'Admin'}</span>
          </div>
          <button
            type="button"
            className="admin-logout-btn"
            onClick={onLogout}
            aria-label="Sign out of admin portal"
          >
            <span>LOG OUT</span>
            <span className="admin-logout-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </header>

      {/* BODY LAYOUT */}
      <div className="admin-layout">
        {/* DEEP BURGUNDY SIDEBAR */}
        <aside className="admin-sidebar" aria-label="Admin Navigation">
          <div className="admin-sidebar-top">
            <p className="admin-sidebar-heading">NAVIGATION</p>
            <nav className="admin-sidebar-nav">
              <button
                type="button"
                className={`admin-nav-item ${currentTab === 'dashboard' ? 'is-active' : ''}`}
                onClick={() => onTabChange?.('dashboard')}
              >
                <span className="admin-nav-icon" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="9" />
                    <rect x="14" y="3" width="7" height="5" />
                    <rect x="14" y="12" width="7" height="9" />
                    <rect x="3" y="16" width="7" height="5" />
                  </svg>
                </span>
                <span className="admin-nav-label">Dashboard</span>
              </button>

              <button
                type="button"
                className={`admin-nav-item ${currentTab === 'enquiries' ? 'is-active' : ''}`}
                onClick={() => onTabChange?.('enquiries')}
              >
                <span className="admin-nav-icon" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <span className="admin-nav-label">Enquiries</span>
                {typeof newEnquiries === 'number' && newEnquiries > 0 ? (
                  <span className="admin-nav-badge" title={`${newEnquiries} new enquiries`}>
                    {newEnquiries}
                  </span>
                ) : typeof totalEnquiries === 'number' && totalEnquiries > 0 ? (
                  <span className="admin-nav-badge-subtle">{totalEnquiries}</span>
                ) : null}
              </button>
            </nav>
          </div>

          <div className="admin-sidebar-bottom">
            <div className="admin-sidebar-card">
              <span className="admin-sidebar-card-label">ARCLANE GLOBAL</span>
              <p className="admin-sidebar-card-text">Secure management console for strategic client engagements.</p>
            </div>
            <a href="/" className="admin-sidebar-back">
              <span>← Return to website</span>
            </a>
          </div>
        </aside>

        {/* MAIN EDITORIAL CONTENT AREA */}
        <main className="admin-main" id="admin-main-content">
          {children}
        </main>
      </div>
    </div>
  )
}
