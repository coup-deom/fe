import React from 'react'

import { cn } from '@/lib/utils'

interface Props {
  className?: string
}
export const VerticalCardList: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-4 py-4', className)}>{children}</div>
  )
}
