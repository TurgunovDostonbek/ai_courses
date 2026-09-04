import { Component } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'

/**
 * Ilova darajasidagi xato to'sig'i.
 * Provayderlardan tashqarida turadi — shu sabab matnlar tarjimasiz.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    // Real muhitda bu joyda xato monitoringiga yuboriladi
    console.error('Ilova xatosi:', error, info)
  }

  handleReset = () => {
    this.setState({ error: null })
    window.location.assign('/')
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div
        style={{
          minHeight: '100dvh',
          display: 'grid',
          placeItems: 'center',
          padding: '2rem',
          textAlign: 'center',
        }}
        role="alert"
      >
        <div style={{ maxWidth: 460, display: 'grid', gap: '1rem', justifyItems: 'center' }}>
          <AlertTriangle size={34} color="var(--danger)" aria-hidden="true" />
          <h1 style={{ fontSize: 'var(--fs-2xl)' }}>Kutilmagan xatolik</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Sahifani yangilab ko‘ring. Muammo takrorlansa, brauzer xotirasini tozalash yordam beradi.
          </p>
          <pre
            style={{
              maxWidth: '100%',
              overflowX: 'auto',
              fontSize: 'var(--fs-xs)',
              color: 'var(--text-muted)',
            }}
          >
            {String(this.state.error?.message || this.state.error)}
          </pre>
          <button
            type="button"
            onClick={this.handleReset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '.5rem',
              padding: '.6rem 1.1rem',
              borderRadius: 'var(--r-md)',
              background: 'var(--brand)',
              color: 'var(--text-on-brand)',
              fontWeight: 'var(--fw-semibold)',
            }}
          >
            <RotateCcw size={16} /> Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    )
  }
}

export default ErrorBoundary
