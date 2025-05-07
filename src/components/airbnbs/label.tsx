'use client'

import * as React from 'react'

import * as LabelPrimitive from '@radix-ui/react-label'

import { cn } from '@/lib/utils'

interface Props {
  subLabel?: React.ReactNode
  description?: React.ReactNode
}
function Label({
  className,
  description,
  subLabel,
  ...props
}: Props & React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'flex items-start gap-1 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        'flex-col font-bold text-lg px-1 pb-2',
        className,
      )}
      {...props}
    >
      <div>
        {props.children}
        {subLabel && (
          <span className="pl-2 text-xs font-bold text-muted-foreground">
            {subLabel}
          </span>
        )}
      </div>
      {description && (
        <div className="text-sm font-medium text-muted-foreground">
          {description}
        </div>
      )}
    </LabelPrimitive.Root>
  )
}

export { Label }
