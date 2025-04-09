import React from 'react'

const ShopCardRoot: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col w-full gap-6 px-3 py-3 bg-white shadow-xs rounded-2xl">
      <div className="flex flex-row w-full h-12 gap-5 shrink-0">
        <img
          src="TODO: image url"
          alt=""
          width="100%"
          height="100%"
          className="w-12 h-12 bg-black rounded-full"
        />
        <div className="flex flex-col justify-start grow-1">
          <div className="w-full overflow-hidden text-base font-bold text-black text-ellipsis">
            기본 카드
          </div>
          <div className="text-xs text-black font-bold w-full mt-2.5">
            나의 스탬프: 5개
          </div>
        </div>
      </div>
      {children ? (
        <div className="w-full h-[82px] overflow-hidden">
          <div className="flex flex-row items-start w-full gap-2 pb-[16px] overflow-auto">
            {children}
          </div>
        </div>
      ) : null}
    </div>
  )
}

const ShopCardStamp: React.FC = () => {
  return (
    <div className="flex flex-col shrink-0 justify-center items-start p-3 gap-2.5 h-[82px] bg-white shadow-md rounded-sm border-2 border-[#A22085]">
      <div className="flex flex-row items-center w-full gap-1 p-0">
        <span className="text-sm font-bold bg-gradient-to-r from-[#A22085] to-[#600F97] text-transparent bg-clip-text">
          10개
        </span>
        <span className="text-xs font-medium bg-gradient-to-r from-[#A22085] to-[#600F97] text-transparent bg-clip-text">
          ✓ 달성
        </span>
      </div>
      <div className="w-full overflow-hidden text-ellipsis">
        <span className="text-sm font-medium bg-gradient-to-r from-[#A22085] to-[#600F97] text-transparent bg-clip-text">
          아메리카노 1잔
        </span>
      </div>
    </div>
  )
}

export const ShopCard = Object.assign(ShopCardRoot, {
  Stamp: ShopCardStamp,
})
