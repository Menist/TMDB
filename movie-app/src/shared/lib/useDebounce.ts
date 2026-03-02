import {useEffect, useState} from "react";

export const useDebounce = <T, >(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Создать таймер
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup - отменить таймер при новом вводе
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}