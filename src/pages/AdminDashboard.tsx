import { useEffect, useState } from 'react'
import { AdminShell } from '../components/admin/AdminShell'
import { signOut } from '../services/authService'
import { supabase } from '../lib/supabase'

export function AdminDashboard() {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    supabase?.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null))
  }, [])

  const logout = async () => {
    await signOut()
    window.location.replace('/admin/login')
  }

  return (
    <AdminShell email={email} onLogout={logout}>
      <section className="admin-panel admin-panel-hero">
        <p className="admin-eyebrow">ARCLANE / ADMIN</p>
        <h1>Dashboard</h1>
        <p>Enquiry management workspace.</p>
      </section>

      <section className="admin-overview" aria-label="Overview">
        <article className="admin-metric">
          <span>TOTAL ENQUIRIES</span>
          <strong>—</strong>
        </article>
        <article className="admin-metric">
          <span>NEW</span>
          <strong>—</strong>
        </article>
        <article className="admin-metric">
          <span>CONTACTED</span>
          <strong>—</strong>
        </article>
      </section>

      <section className="admin-panel">
        <div className="admin-section-head">
          <div>
            <p className="admin-eyebrow">Recent enquiries</p>
            <h2>Latest activity</h2>
          </div>
          <button className="admin-tab is-active" type="button">
            Dashboard
          </button>
        </div>

        <div className="admin-empty">
          <strong>No enquiries yet.</strong>
          <p>New enquiries submitted through the public website will appear here.</p>
        </div>
      </section>
    </AdminShell>
  )
}
