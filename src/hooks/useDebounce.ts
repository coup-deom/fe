import { useCallback, useRef } from 'react'

export function useDebounce<T>(fn: (args: T) => void, delay: number) {
  const handler = useRef<ReturnType<typeof setTimeout> | null>(null)
  const debounce = useCallback(
    (args: T) => {
      handler.current && clearTimeout(handler.current)
      handler.current = setTimeout(() => {
        fn(args)
      }, delay)
    },
    [fn, delay],
  )
  const cancel = () => {
    handler.current && clearTimeout(handler.current)
  }
  return { debounce, cancel }
}
