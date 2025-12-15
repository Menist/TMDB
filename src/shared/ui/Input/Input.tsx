import * as React from "react";

type InputProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'text' | 'number' | 'search';
  disabled?: boolean;
  className?: string;
  value: string
}

export const Input = ({type, className, onChange, disabled, value}: InputProps) => {
  return (
    <input type={type} className={className} onChange={onChange} disabled={disabled} value={value}/>
  )
}