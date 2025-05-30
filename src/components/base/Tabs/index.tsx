import * as React from 'react'

import { cn } from '@/lib/utils'
import * as TabsPrimitive from '@radix-ui/react-tabs'

interface Props {
  data: {
    value: string
    label: string
  }[]
  value: string
  onChange: (value: string) => void
}
const TabsRoot: React.FC<Props> = ({ data, value, onChange }) => {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2 bg-white')}
    >
      <TabsPrimitive.List
        data-slot="tabs-list"
        className={cn(
          'inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]',
        )}
      >
        {data.map(item => (
          <TabsPrimitive.Trigger
            key={item.value}
            value={item.value}
            onClick={() => onChange(item.value)}
            data-slot="tabs-trigger"
            data-state={item.value === value ? 'active' : 'inactive'}
            tabIndex={item.value === value ? 0 : -1}
            aria-selected={item.value === value}
            className={cn(
              'border-b-2 inline-flex flex-1 items-center justify-center px-2.5 py-1 text-md whitespace-nowrap transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none',
              'w-full font-bold data-[state=active]:text-black data-[state=active]:border-black data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-500',
            )}
          >
            {item.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  )
}

const TabsWithWrapper: React.FC<
  React.PropsWithChildren<Props & { className?: string }>
> = ({ className, children, ...props }) => {
  return (
    <div className={cn('pt-15')}>
      <div
        className={cn('fixed z-50 left-0 right-0 shadow-md top-16', className)}
      >
        <TabsRoot {...props} />
      </div>
      {children}
    </div>
  )
}

export const Tabs = Object.assign(TabsRoot, {
  WithWrapper: TabsWithWrapper,
})
