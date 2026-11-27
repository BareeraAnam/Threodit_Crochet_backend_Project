import { useState, type FormEvent } from 'react'
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'

interface ContactSectionProps {
  isPage?: boolean
}

export default function ContactSection({ isPage = false }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  function validate() {
    const errs: Record<string, string> = {}
    if (!formData.name.trim()) {
      errs.name = 'Please enter your name.'
    }
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.'
    }
    if (!formData.message.trim()) {
      errs.message = 'Please enter a message.'
    }
    return errs
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 6000)
    }
  }

  return (
    <section
      aria-label="Contact Threodit"
      className={`page-container ${isPage ? 'py-8 md:py-14' : 'py-12 md:py-20'}`}
    >
      {/* Top Header with Decorative Yarn Ball Doodle */}
      <div className="relative mb-10 flex items-start justify-between md:mb-14">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-heading sm:text-4xl md:text-5xl">
            Contact Us
          </h1>
          <p className="mt-2 text-sm text-muted sm:text-base md:mt-3">
            We'd love to hear from you! Send us a message and we'll get back to you soon.
          </p>
        </div>

        {/* Decorative Yarn Ball Sketch (Top Right) */}
        <div className="pointer-events-none hidden text-primary sm:block" aria-hidden="true">
          <svg width="90" height="90" viewBox="0 0 100 100" fill="none" className="stroke-primary">
            {/* Yarn ball loops */}
            <circle cx="65" cy="35" r="28" stroke="#E5BD53" strokeWidth="2.5" />
            <path d="M42 25 C50 15, 80 15, 88 25" stroke="#E5BD53" strokeWidth="2" />
            <path d="M45 45 C55 58, 75 58, 85 45" stroke="#E5BD53" strokeWidth="2" />
            <path d="M50 18 C65 35, 65 55, 52 62" stroke="#E5BD53" strokeWidth="2" />
            <path d="M78 18 C65 35, 65 55, 76 62" stroke="#E5BD53" strokeWidth="2" />
            {/* Yarn thread tail */}
            <path
              d="M40 45 C25 45, 15 65, 30 75 C45 85, 70 85, 95 70"
              stroke="#E5BD53"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Main Grid: Contact Details Left & Message Form Right */}
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Left Column: 4 Contact Info Items (5 cols on lg) */}
        <div className="space-y-6 lg:col-span-5">
          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-heading shadow-sm">
              <Mail size={22} aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-heading text-base font-semibold text-heading sm:text-lg">
                Email
              </h2>
              <a
                href="mailto:hello@threodit.com"
                className="mt-0.5 block text-sm text-body transition hover:text-primary-dark hover:underline sm:text-base"
              >
                hello@threodit.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-heading shadow-sm">
              <Phone size={22} aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-heading text-base font-semibold text-heading sm:text-lg">
                Phone
              </h2>
              <a
                href="tel:+1234567890"
                className="mt-0.5 block text-sm text-body transition hover:text-primary-dark hover:underline sm:text-base"
              >
                +1 234 567 890
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-heading shadow-sm">
              <MapPin size={22} aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-heading text-base font-semibold text-heading sm:text-lg">
                Address
              </h2>
              <p className="mt-0.5 text-sm leading-relaxed text-body sm:text-base">
                123 Craft Street, <br />
                New York, NY 10001
              </p>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-heading shadow-sm">
              <Clock size={22} aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-heading text-base font-semibold text-heading sm:text-lg">
                Hours
              </h2>
              <p className="mt-0.5 text-sm leading-relaxed text-body sm:text-base">
                Mon - Fri: 9AM - 6PM <br />
                Sat - Sun: 10AM - 4PM
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Four-field Message Form (7 cols on lg) */}
        <div className="lg:col-span-7">
          {submitted && (
            <div className="mb-6 flex items-start gap-3 rounded-card border border-success/30 bg-success/10 p-4 text-sm text-success">
              <CheckCircle2 size={20} className="shrink-0 text-success" />
              <div>
                <p className="font-semibold">Thank you for reaching out!</p>
                <p className="mt-0.5 text-xs text-success/90">
                  We have received your message and will get back to you shortly.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="contact-name" className="sr-only">
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value })
                  if (errors.name) setErrors({ ...errors, name: '' })
                }}
                placeholder="Your Name"
                className={`w-full rounded-card border bg-surface px-4 py-3 text-sm text-heading placeholder:text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark ${
                  errors.name ? 'border-error' : 'border-line'
                }`}
              />
              {errors.name && (
                <p className="mt-1 flex items-center gap-1 text-xs text-error">
                  <AlertCircle size={13} /> {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="contact-email" className="sr-only">
                Your Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value })
                  if (errors.email) setErrors({ ...errors, email: '' })
                }}
                placeholder="Your Email"
                className={`w-full rounded-card border bg-surface px-4 py-3 text-sm text-heading placeholder:text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark ${
                  errors.email ? 'border-error' : 'border-line'
                }`}
              />
              {errors.email && (
                <p className="mt-1 flex items-center gap-1 text-xs text-error">
                  <AlertCircle size={13} /> {errors.email}
                </p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="contact-subject" className="sr-only">
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Subject"
                className="w-full rounded-card border border-line bg-surface px-4 py-3 text-sm text-heading placeholder:text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" className="sr-only">
                Your Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value })
                  if (errors.message) setErrors({ ...errors, message: '' })
                }}
                placeholder="Your Message"
                className={`w-full rounded-card border bg-surface px-4 py-3 text-sm text-heading placeholder:text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark ${
                  errors.message ? 'border-error' : 'border-line'
                }`}
              />
              {errors.message && (
                <p className="mt-1 flex items-center gap-1 text-xs text-error">
                  <AlertCircle size={13} /> {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-btn bg-primary px-8 py-3.5 text-sm font-semibold text-heading shadow-sm transition-all hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark focus-visible:ring-offset-2 sm:w-auto sm:text-base"
              >
                Send Message <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom: Stylized Map Illustration */}
      <div className="relative mt-12 overflow-hidden rounded-banner border border-line bg-surface shadow-soft md:mt-16">
        <div className="relative aspect-[21/9] min-h-[220px] w-full">
          <img
            src="/images/contact-map.jpg"
            alt="Illustrated city map location for Threodit Craft Studio in New York, NY"
            className="h-full w-full object-cover"
            loading="lazy"
          />

          {/* Floating Location Card matching 07_Contact.png */}
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-2xl border border-line/60 bg-surface/95 px-5 py-3 shadow-card backdrop-blur-md">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E54D42] text-white shadow-xs">
              <MapPin size={20} fill="currentColor" />
            </div>
            <div className="text-left">
              <p className="font-heading text-sm font-bold tracking-tight text-heading sm:text-base">
                New York, NY
              </p>
              <p className="text-xs text-muted">
                123 Craft Street
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
