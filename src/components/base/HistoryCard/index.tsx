import { dateString } from '@/lib/date'

import { Stamp } from '../Stamp'

interface Props {
  storeImage: string
  storeName: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED'
  otp?: string
  createdAt: Date
  deom?: {
    id: number
    name: string
    amount: number
  }
}
export const HistoryCard: React.FC<Props> = ({
  status,
  storeImage,
  storeName,
  createdAt,
  otp,
  deom,
}) => {
  return (
    <div className="flex flex-col w-full px-3 py-3 bg-white shadow-xs rounded-2xl">
      <div className="flex flex-row w-full h-20 gap-5 shrink-0">
        <img
          src={storeImage}
          alt=""
          width="100%"
          height="100%"
          className="w-12 h-12 bg-black rounded-full shrink-0"
        />
        <div className="flex items-start flex-column flex-1 min-w-0">
          <div className="flex flex-col justify-start w-full">
            <div className="flex flex-row justify-start items-center gap-2 w-full  text-lg font-bold text-black min-w-0">
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {storeName}
              </span>
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

          {deom && (
            <div className="flex flex-row flex-end shrink-0">
              <Stamp
                count={deom.amount}
                threshold={{ now: deom.amount, prev: deom.amount }}
                name={deom.name}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-end items-center text-xs text-[#333333] font-light">
        {status === 'EXPIRED' && (
          <span className="text-xs font-bold text--gray-400 rounded-full shrink-0 mx-2">
            만료됨
          </span>
        )}
        {status === 'PENDING' && (
          <span className="text-xs font-bold text--[#22CC88] rounded-full shrink-0 mx-2">
            진행 중
          </span>
        )}
        {status === 'APPROVED' && (
          <span className="text-xs font-bold text-[#A22085] rounded-full shrink-0 mx-2">
            완료됨
          </span>
        )}
        {status === 'REJECTED' && (
          <span className="text-xs font-bold text-[#FF4D4D] rounded-full shrink-0 mx-2">
            거절됨
          </span>
        )}
        {dateString(createdAt)}
      </div>
    </div>
  )
}
