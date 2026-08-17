import { useEffect, useState, type ReactNode } from 'react'
import { supabase } from '../../lib/supabase'

export function ProtectedAdminRoute({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    let alive = true

    const run = async () => {
      if (!supabase) {
        if (alive) setLoading(false)
        return
      }

      const { data } = await supabase.auth.getSession()
      const session = data.session

      if (!session) {
        if (alive) {
          window.location.replace('/admin/login')
        }
        return
      }

      const { data: adminRow, error } = await supabase
        .from('admin_users')
        .select('user_id, role')
        .eq('user_id', session.user.id)
        .maybeSingle()

      if (alive) {
        setAuthorized(Boolean(adminRow && !error))
        setLoading(false)
        if (!adminRow || error) window.location.replace('/admin/login')
      }
    }

    run()

    const authSubscription = supabase?.auth.onAuthStateChange((_event, session) => {
      if (!alive) return
      if (!session) {
        setAuthorized(false)
        setLoading(false)
        window.location.replace('/admin/login')
      }
    })

    return () => {
      alive = false
      authSubscription?.data.subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <main className="admin-screen">
        <div className="admin-loading">Checking access…</div>
      </main>
    )
  }

  if (!authorized) return null

  return <>{children}</>
}
