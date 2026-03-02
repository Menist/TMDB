export const formatRuntime = (minutes: number | null): string => {
  if (!minutes) return 'N/A'

  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  return `${hours}ч ${mins}м`
}