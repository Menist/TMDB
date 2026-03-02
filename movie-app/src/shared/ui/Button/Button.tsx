import type {ButtonHTMLAttributes} from "react";
import s from './Button.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

export const Button = ({variant = "primary", className, children, ...rest}: ButtonProps) => {
  return (
    <button className={`${s.button} ${s[variant]} ${className || ''}`} {...rest} > {children}</button>
  );
}