import { cn } from '@/lib/utils'

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
  const onProgress = threshold.prev <= count
  const isAchieved = threshold.now <= count

  return (
    <div
      className={cn(
        'flex flex-col shrink-0 justify-center items-start px-3 py-1 gap-1 h-18 bg-white shadow-md rounded-sm border-2',
        isAchieved
          ? 'border-[#A22085]'
          : onProgress
            ? 'border-[#22CC88]'
            : 'border-gray-200 bg-white',
      )}
      {...props}
    >
      <div className="flex flex-row items-center w-full gap-1 p-0">
        <span
          className={cn(
            'text-sm font-bold text-transparent bg-clip-text',
            isAchieved
              ? 'bg-gradient-to-r from-[#A22085] to-[#600F97]'
              : onProgress
                ? 'text-[#22CC88]'
                : 'text-gray-500',
          )}
        >
          {threshold.now}개
        </span>
        {(() => {
          if (isAchieved) {
            return (
              <span className="text-xs font-medium bg-gradient-to-r from-[#A22085] to-[#600F97] text-transparent bg-clip-text">
                ✓ 달성
              </span>
            )
          }
          if (onProgress) {
            return (
              <span className="text-xs font-medium text-[#22CC88] bg-clip-text">
                진행 중
              </span>
            )
          }
          return (
            <span className="text-xs font-medium text-gray-500 bg-clip-text">
              미달성
            </span>
          )
        })()}
      </div>
      <div className="w-full overflow-hidden text-ellipsis">
        <span
          className={cn(
            'text-sm font-medium text-transparent bg-clip-text',
            isAchieved
              ? 'bg-gradient-to-r from-[#A22085] to-[#600F97]'
              : onProgress
                ? 'text-[#22CC88]'
                : 'text-gray-500',
          )}
        >
          {name}
        </span>
      </div>
    </div>
  )
}
