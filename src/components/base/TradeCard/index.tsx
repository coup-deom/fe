import { CompareIcon } from '../svgs/CompareIcon'
import { EditIcon } from '../svgs/EditIcon'

export const TradeCard: React.FC = () => {
  return (
    <div className="flex flex-col w-full gap-6 px-4 py-4 bg-white shadow-xs rounded-2xl">
      <div className="flex flex-row items-center justify-between w-full">
        <span className="text-sm font-bold">2025. 03. 19</span>
        <span className="text-sm">
          <EditIcon />
        </span>
      </div>

      <div className="flex flex-row items-center justify-between w-full gap-6 p-0">
        <div className="flex flex-col items-start justify-center flex-1 flex-grow gap-3">
          <div className="w-full font-bold text-md leading-[21px] text-black">
            카페 에스프레소
          </div>
          <div className="w-full h-4 text-xs font-medium text-black leading-md">
            관악구청점
          </div>
          <div className="w-full pt-2 text-sm font-bold text-black leading-md">
            “스탬프 3개”와 함께
          </div>
        </div>
        <div className="flex flex-row items-center justify-center p-0 shrink-0">
          <CompareIcon fill="black" />
        </div>
        <div className="flex flex-col items-start justify-center flex-1 flex-grow gap-3">
          <div className="w-full font-bold text-md leading-[21px] text-black">
            배스킨라빈스
          </div>
          <div className="w-full h-4 text-xs font-medium text-black leading-md">
            상도점
          </div>
          <div className="w-full pt-2 text-sm font-bold text-black leading-md">
            “스탬프 2개”를 기다려요.
          </div>
        </div>
      </div>
    </div>
  )
}
