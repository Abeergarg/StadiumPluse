'use client';

interface LoginFormProps {
  ticketId: string;
  name: string;
  phone: string;
  loading: boolean;
  error: string;
  onTicketChange: (v: string) => void;
  onNameChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
  onSubmit: () => void;
}

/* ================================================================
   LoginForm — Step 1: Ticket ID + Name + Phone entry
   ================================================================ */
export default function LoginForm({
  ticketId, name, phone, loading, error,
  onTicketChange, onNameChange, onPhoneChange, onSubmit,
}: LoginFormProps) {
  return (
    <section aria-labelledby="login-form-heading">
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: '1.7rem', marginBottom: 8 }} aria-hidden="true">🎟️</div>
        <h2
          id="login-form-heading"
          style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.3rem', fontWeight: 800, color: 'var(--t1)', marginBottom: 5 }}
        >
          Enter Ticket Details
        </h2>
        <p style={{ color: 'var(--t3)', fontSize: '.83rem' }}>
          We&apos;ll send an OTP to verify your phone number.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          aria-live="assertive"
          style={{ background: 'var(--err-l)', border: '1px solid rgba(220,38,38,.22)', borderRadius: 9, padding: '9px 13px', fontSize: '.8rem', color: 'var(--err)', marginBottom: 14, fontWeight: 600 }}
        >
          ⚠️ {error}
        </div>
      )}

      <div className="form-grp">
        <label className="form-lbl" htmlFor="ticket-id">Ticket ID / Booking Reference</label>
        <input
          id="ticket-id"
          className="form-input"
          placeholder="e.g. TKT-2026-A1B2"
          value={ticketId}
          onChange={(e) => onTicketChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
          autoComplete="off"
          aria-required="true"
          aria-describedby="ticket-hint"
        />
        <span id="ticket-hint" style={{ fontSize: '.7rem', color: 'var(--t4)', marginTop: 3 }}>
          Found on your booking confirmation
        </span>
      </div>

      <div className="form-grp">
        <label className="form-lbl" htmlFor="fan-name">Full Name</label>
        <input
          id="fan-name"
          className="form-input"
          placeholder="Your name on the ticket"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          autoComplete="name"
          aria-required="true"
        />
      </div>

      <div className="form-grp">
        <label className="form-lbl" htmlFor="phone">Phone Number</label>
        <div style={{ display: 'flex', gap: 8 }}>
          <span
            style={{ background: 'var(--bg)', border: '1.5px solid var(--bd2)', borderRadius: 'var(--rs)', padding: '10px 13px', fontSize: '.88rem', color: 'var(--t3)', fontWeight: 700, flexShrink: 0 }}
            aria-label="Country code India +91"
          >
            🇮🇳 +91
          </span>
          <input
            id="phone"
            className="form-input"
            placeholder="10-digit number"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value.replace(/\D/g, '').slice(0, 10))}
            inputMode="numeric"
            autoComplete="tel"
            onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
            aria-required="true"
            aria-label="Phone number (10 digits)"
            maxLength={10}
          />
        </div>
      </div>

      <button
        className="login-btn"
        onClick={onSubmit}
        disabled={loading}
        style={{ marginTop: 6 }}
        aria-busy={loading}
      >
        {loading ? '⏳ Sending OTP…' : '📲 Send OTP →'}
      </button>
    </section>
  );
}
