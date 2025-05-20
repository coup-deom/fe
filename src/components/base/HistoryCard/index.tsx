import React from 'react'

import { Stamp } from '../Stamp'

interface Props {
  storeName: string
  otp?: string
  createdAt: Date
}
export const HistoryCard: React.FC<Props> = ({ storeName, createdAt, otp }) => {
  return (
    <div className="flex flex-col w-full px-3 py-3 bg-white shadow-xs rounded-2xl">
      <div className="flex flex-row w-full h-20 gap-5 shrink-0">
        <img
          src="TODO: image url"
          alt=""
          width="100%"
          height="100%"
          className="w-12 h-12 bg-black rounded-full"
        />
        <div className="flex items-start w-full flex-column">
          <div className="flex flex-col justify-start grow-1">
            <div className="w-full overflow-hidden text-lg font-bold text-black text-ellipsis">
              {storeName}
            </div>
            <div className="w-full mt-3 text-xs font-bold text-black">
              {otp && (
                <>
                  <span className="pr-3">OTP</span>
                  {[...otp].map((v, i) => (
                    <span key={i} className="px-0.5 font-light">
                      {v}
                    </span>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="flex flex-row flex-end shrink-0">
            <Stamp
              count={10}
              threshold={{ now: 10, prev: 10 }}
              name="아메리카노 1잔"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end text-xs text-[#333333] font-light">
        {createdAt.toISOString().slice(0, 10).replaceAll('-', '.')}
      </div>
    </div>
  )
}
