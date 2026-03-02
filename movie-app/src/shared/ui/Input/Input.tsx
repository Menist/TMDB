import type {InputHTMLAttributes} from "react"
import s from './Input.module.css'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export const Input = ({label, error, className, ...rest}: InputProps) => {
  return (
    <div className={s.inputWrapper}>
      {label && <label className={s.label}>{label}</label>}
      <input
        className={`${s.input} ${className || ''}`}
        {...rest}
      />
      {error && <span className={s.error}>{error}</span>}
    </div>
  )
}