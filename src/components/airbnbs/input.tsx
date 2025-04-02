import * as React from 'react'

import { cn } from '@/lib/utils'

interface Props {
  right?: React.ReactNode
}
function Input({
  className,
  type,
  right,
  ...props
}: React.ComponentProps<'input'> & Props) {
  return (
    <div className="flex w-full min-w-0 rounded-md border bg-transparent pr-12 px-3 py-3 text-base shadow-xs transition-[color,box-shadow] outline-none">
      <input
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground w-full  placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus:outline-none focus:border-none',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className,
        )}
        {...props}
      />
      {right && (
        <div className="absolute top-0 flex items-center justify-center h-full px-2 right-6">
          {right}
        </div>
      )}
    </div>
  )
}

export { Input }
