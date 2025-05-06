import React from 'react'

import { cn } from '@/lib/utils'

interface Option {
  label: string
  value: string
}
interface Props {
  options: Option[]
  value: Set<string>
  onChange: (value: Set<string>) => void
}
const FiltersRoot: React.FC<React.PropsWithChildren<Props>> = ({
  options,
  value,
  onChange,
}) => {
  const onClick: (curr: string) => React.MouseEventHandler = curr => () => {
    if (value.has(curr)) {
      value.delete(curr)
      onChange(new Set(value))
      return
    }
    value.add(curr)
    onChange(new Set(value))
  }

  return (
    <div className="flex w-full overflow-y-hidden shadow-md h-15">
      <div className="flex flex-row items-center justify-start w-full gap-3 px-4 pb-4 overflow-x-auto overflow-y-hidden bg-white h-18 flex-nowrap">
        {options.map(opt => (
          <span
            key={opt.value}
            onClick={onClick(opt.value)}
            className={cn(
              'flex flex-row items-center justify-center px-6 py-2 rounded-full whitespace-nowrap border-1',
              value.has(opt.value)
                ? 'bg-black border-black text-white font-bold'
                : 'bg-white',
            )}
          >
            {opt.label}
          </span>
        ))}
      </div>
    </div>
  )
}

const FiltersWithWrapper: React.FC<
  React.PropsWithChildren<Props & { className?: string }>
> = ({ className, children, ...props }) => {
  return (
    <div className={cn('pt-15')}>
      <div className={cn('fixed left-0 right-0 shadow-md top-16', className)}>
        <Filters {...props} />
      </div>
      {children}
    </div>
  )
}

export const Filters = Object.assign(FiltersRoot, {
  WithWrapper: FiltersWithWrapper,
})
