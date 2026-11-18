import { useState } from 'react'

/**
 * Contact
 * -------
 * Submitting the form POSTs to FormSubmit.co (https://formsubmit.co), a free
 * form-to-email service that needs no account or API key up front — it just
 * delivers straight to the email address in the URL. This is the closest a
 * plain static React build can get to "real" automatic email delivery
 * without you standing up your own backend.
 *
 * One-time step: the FIRST submission triggers an activation email from
 * FormSubmit to ajithajith54957@gmail.com — click the confirmation link in
 * that email once, and every submission after that delivers automatically
 * with no further action needed.
 *
 * Want a different service instead (e.g. EmailJS, Formspree with your own
 * account)? Swap the `fetch(...)` call in `handleSubmit` below.
 */
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  async function handleSubmit() {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in your name, email, and message.')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('https://formsubmit.co/ajax/ajithajith54957@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio contact from ${form.name}`,
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <section className="section nm-section" id="contact">
      <div className="container">
        <div className="eyebrow reveal">Get In Touch</div>
        <h2 className="section-title reveal">Contact</h2>
        <div className="row g-5">
          <div className="col-lg-7 reveal">
            <div className="nm nm-card">
              <h3 className="nm-title">Send a Message</h3>
              <div className="nm-field">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="nm-input"
                  placeholder="Your Name"
                />
              </div>
              <div className="nm-field">
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  className="nm-input"
                  placeholder="Your Email"
                />
              </div>
              <div className="nm-field">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  className="nm-input"
                  placeholder="Your Message"
                ></textarea>
              </div>
              {error && (
                <p style={{ color: 'var(--red-core)', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>
              )}
              <button
                type="button"
                className="nm nm-btn"
                onClick={handleSubmit}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Message Sent' : 'Send Message'}{' '}
                <i className="bi bi-send"></i>
              </button>
              {status === 'sent' && (
                <p
                  style={{
                    color: 'var(--text-low)',
                    fontSize: '0.78rem',
                    marginTop: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  Thanks — your message is on its way to my inbox.
                </p>
              )}
              {status === 'error' && (
                <p
                  style={{
                    color: 'var(--red-core)',
                    fontSize: '0.78rem',
                    marginTop: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  Something went wrong. Please email me directly at ajithajith54957@gmail.com.
                </p>
              )}
            </div>
          </div>
          <div className="col-lg-5 reveal">
            <a className="nm nm-link" href="mailto:ajithajith54957@gmail.com">
              <span className="nm-ico"><i className="bi bi-envelope-fill"></i></span> ajithajith54957@gmail.com
            </a>
            <a className="nm nm-link" href="tel:+919629706538">
              <span className="nm-ico"><i className="bi bi-telephone-fill"></i></span> +91 96297 06538
            </a>
            <a className="nm nm-link" href="https://github.com/FullStackAjith" target="_blank" rel="noreferrer">
              <span className="nm-ico"><i className="bi bi-github"></i></span> github.com/FullStackAjith
            </a>
            <div className="nm nm-link" style={{ cursor: 'default' }}>
              <span className="nm-ico"><i className="bi bi-geo-alt-fill"></i></span> Coimbatore, Tamil Nadu, India
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
