export const FullScreenLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      {children}
    </div>
  )
}
