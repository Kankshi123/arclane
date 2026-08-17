import type { ReactNode } from 'react'

export function AdminShell({
  email,
  onLogout,
  children,
}: {
  email?: string | null
  onLogout: () => void
  children: ReactNode
}) {
  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div className="admin-shell-brand">
          <div className="admin-wordmark">
            ARCLANE <i>ADMIN</i>
          </div>
          <p>Internal portal</p>
        </div>
        <div className="admin-header-actions">
          <span className="admin-user">{email ?? 'Authenticated admin'}</span>
          <button className="button small admin-logout" onClick={onLogout}>
            Log out
          </button>
        </div>
      </header>
      <div className="admin-layout">
        <aside className="admin-nav" aria-label="Admin navigation">
          <button className="is-active" type="button">
            Dashboard
          </button>
          <button type="button">Enquiries</button>
        </aside>
        <section className="admin-content">{children}</section>
      </div>
    </main>
  )
}
