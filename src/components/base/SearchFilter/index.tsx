import React, { useEffect, useState } from 'react'

import { SearchIcon } from '../svgs/SearchIcon'

import { Input } from '@/components/airbnbs/input'
import { cn } from '@/lib/utils'
import { useDebounce } from '@/hooks/useDebounce'

interface Props {
  value: string
  onChange: (value: string) => void
}
const SearchFilterRoot: React.FC<React.PropsWithChildren<Props>> = ({
  value,
  onChange: _onChange,
}) => {
  const { debounce } = useDebounce(_onChange, 300)

  useEffect(() => {
    setBuf(value)
  }, [value])

  const [buf, setBuf] = useState(value)

  useEffect(() => {
    if (buf === value) return
    debounce(buf)
  }, [buf, value])

  return (
    <div className="flex flex-row w-full items-center justify-start px-4 py-2.5 bg-white">
      <Input
        placeholder="가게 검색"
        value={buf}
        onChange={e => setBuf(e.target.value.trim())}
        right={
          <SearchIcon className="fill-black" onClick={() => _onChange(buf)} />
        }
      />
    </div>
  )
}

const SearchFilterWithWrapper: React.FC<
  React.PropsWithChildren<Props & { className?: string }>
> = ({ className, children, ...props }) => {
  return (
    <div className={cn('pt-15')}>
      <div
        className={cn('fixed z-50 left-0 right-0 shadow-md top-31', className)}
      >
        <SearchFilterRoot {...props} />
      </div>
      {children}
    </div>
  )
}

export const SearchFilter = Object.assign(SearchFilterRoot, {
  WithWrapper: SearchFilterWithWrapper,
})
