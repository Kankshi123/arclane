import { useMemo, useState, type FormEvent } from 'react'
import { signInWithEmailPassword } from '../services/authService'

export function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const errorText = useMemo(() => {
    if (!error) return ''
    if (error.toLowerCase().includes('invalid')) {
      return 'Please check your email and password and try again.'
    }
    return 'Please check your credentials and try again.'
  }, [error])

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { error: authError } = await signInWithEmailPassword(email, password)
      if (authError) {
        setError(authError.message.toLowerCase().includes('invalid') ? 'Invalid credentials.' : 'Authentication error. Please try again.')
        return
      }
      window.location.replace('/admin')
    } catch {
      setError('Authentication error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="admin-screen">
      <div className="admin-bg" aria-hidden="true" />

      <header className="admin-topbar">
        <div className="admin-brand">
          <span>ARCLANE</span>
          <i aria-hidden="true" />
          <em>ADMIN</em>
        </div>
      </header>

      <div className="admin-login-wrap">
        <section className="admin-login" aria-label="Admin sign in">
          <div className="admin-login-mark" aria-hidden="true">
            <span />
          </div>

          <div className="admin-login-head">
            <p className="admin-eyebrow">Restricted access</p>
            <h1>Sign in</h1>
            <p>Authorized team members only.</p>
          </div>

          <form onSubmit={submit} noValidate>
            <label className="admin-field">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="Enter your email"
                required
              />
            </label>

            <label className="admin-field">
              Password
              <div className="admin-password">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-pressed={showPassword}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>

            {error && (
              <div className="admin-error" role="alert">
                <strong>Authentication failed.</strong>
                <span>{errorText}</span>
              </div>
            )}

            <button className="button admin-submit" type="submit" disabled={loading}>
              {loading ? 'SIGNING IN…' : 'SIGN IN'} <span aria-hidden="true">→</span>
            </button>
          </form>
        </section>
      </div>

      <footer className="admin-footer">© ARCLANE. All rights reserved.</footer>
    </main>
  )
}
