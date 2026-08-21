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
        setError(
          authError.message.toLowerCase().includes('invalid')
            ? 'Invalid credentials.'
            : 'Authentication error. Please try again.'
        )
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
    <main className="admin-login-screen">
      {/* Background Architectural Grid/Lines */}
      <div className="admin-login-bg" aria-hidden="true">
        <div className="admin-login-grid" />
      </div>

      {/* Top Bar */}
      <header className="admin-login-topbar">
        <div className="admin-brand">
          <a href="/" className="admin-wordmark" aria-label="Arclane Home">
            ARCLANE <i className="admin-wordmark-accent">ADMIN</i>
          </a>
        </div>
        <a href="/" className="admin-back-link">
          <span>← Return to website</span>
        </a>
      </header>

      {/* Centered Login Card */}
      <div className="admin-login-wrap">
        <section className="admin-login-card" aria-label="Admin sign in">
          <div className="admin-login-head">
            <div className="admin-login-meta-row">
              <span className="admin-login-eyebrow">ARCLANE / ADMIN</span>
              <span className="admin-restricted-pill">RESTRICTED ACCESS</span>
            </div>
            <h1 className="admin-login-title">Sign in</h1>
            <p className="admin-login-subtext">Authorized team members and administrators only.</p>
          </div>

          <form onSubmit={submit} noValidate className="admin-login-form">
            <div className="admin-form-group">
              <label htmlFor="admin-email" className="admin-form-label">
                EMAIL ADDRESS <span className="admin-req-star">*</span>
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="name@arclaneglobal.com"
                required
                className="admin-form-input"
              />
            </div>

            <div className="admin-form-group">
              <div className="admin-form-label-row">
                <label htmlFor="admin-password" className="admin-form-label">
                  PASSWORD <span className="admin-req-star">*</span>
                </label>
              </div>
              <div className="admin-password-wrapper">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="Enter your admin password"
                  required
                  className="admin-form-input admin-password-input"
                />
                <button
                  type="button"
                  className="admin-password-toggle-btn"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-pressed={showPassword}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
            </div>

            {error && (
              <div className="admin-error-box" role="alert">
                <div className="admin-error-icon" aria-hidden="true">!</div>
                <div className="admin-error-content">
                  <strong>Authentication Failed</strong>
                  <span>{errorText}</span>
                </div>
              </div>
            )}

            <button
              className={`admin-login-submit-btn ${loading ? 'is-loading' : ''}`}
              type="submit"
              disabled={loading}
            >
              <span>{loading ? 'SIGNING IN…' : 'SIGN IN'}</span>
              <span className="admin-btn-arrow" aria-hidden="true">→</span>
            </button>
          </form>
        </section>
      </div>

      <footer className="admin-login-footer">
        <p>© ARCLANE GLOBAL · Internal Administration · Confidential</p>
      </footer>
    </main>
  )
}
