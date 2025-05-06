interface Props {
  count: number
  threshold: { now: number; prev: number }
  name: string
}
export const Stamp: React.FC<Props & React.HTMLProps<HTMLDivElement>> = ({
  count,
  name,
  threshold,
  ...props
}) => {
  return (
    <div
      className="flex flex-col shrink-0 justify-center items-start px-3 py-1 gap-1 h-18 bg-white shadow-md rounded-sm border-2 border-[#A22085]"
      {...props}
    >
      <div className="flex flex-row items-center w-full gap-1 p-0">
        <span className="text-sm font-bold bg-gradient-to-r from-[#A22085] to-[#600F97] text-transparent bg-clip-text">
          {count}개
        </span>
        {(() => {
          if (threshold.now <= count) {
            return (
              <span className="text-xs font-medium bg-gradient-to-r from-[#A22085] to-[#600F97] text-transparent bg-clip-text">
                ✓ 달성
              </span>
            )
          }
          if (threshold.prev > count) {
            return (
              <span className="text-xs font-medium text-[#22CC88] bg-clip-text">
                미달성
              </span>
            )
          }
          return (
            <span className="text-xs font-medium text-secondary bg-clip-text">
              진행 중
            </span>
          )
        })()}
      </div>
      <div className="w-full overflow-hidden text-ellipsis">
        <span className="text-sm font-medium bg-gradient-to-r from-[#A22085] to-[#600F97] text-transparent bg-clip-text">
          {name}
        </span>
      </div>
    </div>
  )
}
