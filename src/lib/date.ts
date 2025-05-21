export function dateString(date: Date, delimiter: string = '-'): string {
  const d = date.getDate().toString().padStart(2, '0')
  const m = (date.getMonth() + 1).toString().padStart(2, '0')
  const y = date.getFullYear().toString().padStart(2, '0')

  return [y, m, d].join(delimiter)
}
