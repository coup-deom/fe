import React from 'react'

export const VerticalCardList: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <div className="flex flex-col gap-4 py-4">{children}</div>
}
