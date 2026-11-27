import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react'

interface FieldBase {
  id: string
  label: string
  error?: string
  hideLabel?: boolean
}

function fieldClass(error?: string) {
  return `w-full rounded-card border bg-surface px-4 py-3 text-sm text-heading placeholder:text-muted ${
    error ? 'border-error' : 'border-line'
  }`
}

function Wrapper({
  id,
  label,
  error,
  hideLabel,
  children,
}: FieldBase & { children: ReactNode }) {
  return (
    <div>
      <label
        htmlFor={id}
        className={
          hideLabel ? 'sr-only' : 'mb-1 block text-sm font-medium text-heading'
        }
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-error">
          {error}
        </p>
      )}
    </div>
  )
}

export default function FormField({
  id,
  label,
  error,
  hideLabel,
  className = '',
  ...rest
}: FieldBase & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrapper id={id} label={label} error={error} hideLabel={hideLabel}>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${fieldClass(error)} ${className}`}
        {...rest}
      />
    </Wrapper>
  )
}

export function TextAreaField({
  id,
  label,
  error,
  hideLabel,
  className = '',
  rows = 5,
  ...rest
}: FieldBase & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrapper id={id} label={label} error={error} hideLabel={hideLabel}>
      <textarea
        id={id}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${fieldClass(error)} ${className}`}
        {...rest}
      />
    </Wrapper>
  )
}