import { useId, useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/airbnbs/button'
import { Input } from '@/components/airbnbs/input'
import { Label } from '@/components/airbnbs/label'
import { NoticeIcon } from '@/components/base/svgs/NoticeIcon'
import { CommonLayout } from '@/components/layouts/pages/CommonLayout'
import { withAccessToken } from '@/contexts/AccessToken.context'

export const Route = createFileRoute('/owner/entry/')({
  component: withAccessToken(Entry),
})

const required = <span className="text-[#DD3F57]">필수</span>
const optional = '선택'

function Entry() {
  interface FormData {
    shopName: string
    branchName?: string
    mainImage?: string
    BRN: string
    address: string
    detailAddress?: string
  }
  const [formData, setFormData] = useState<FormData>({
    shopName: '',
    branchName: undefined,
    mainImage: '',
    BRN: '',
    address: '',
    detailAddress: undefined,
  })
  const shopNameID = useId()
  const branchNameID = useId()
  const mainImageID = useId()
  const addressID = useId()

  const onSubmit = () => {
    console.log('제출', formData)
  }

  return (
    <CommonLayout seamless title="가게 입점">
      <div className="flex flex-col items-start justify-start w-full gap-8 ">
        <div className="w-full">
          <Label
            htmlFor={shopNameID}
            subLabel={required}
            description="공식 상호명을 입력해주세요"
          >
            가게명
          </Label>
          <Input
            id={shopNameID}
            placeholder="가게명을 입력해주세요"
            value={formData.shopName}
            onChange={e =>
              setFormData(prev => ({
                ...prev,
                shopName: e.target.value.trim(),
              }))
            }
          />
        </div>

        <div className="w-full">
          <Label
            htmlFor={branchNameID}
            subLabel={optional}
            description="예시: 강남점, 본점 등"
          >
            지점명
          </Label>
          <Input
            id={branchNameID}
            placeholder="지점명을 입력해주세요"
            value={formData.branchName}
            onChange={e =>
              setFormData(prev => ({
                ...prev,
                branchName: e.target.value.trim() || undefined,
              }))
            }
          />
        </div>

        <div className="w-full">
          <Label
            htmlFor={mainImageID}
            subLabel={optional}
            description="미등록 시 기본 이미지가 적용됩니다"
          >
            가게 대표 이미지
          </Label>
          <Input
            id={mainImageID}
            type="file"
            accept="image/*"
            placeholder="가게 대표 이미지를 선택해주세요"
          />
          <div className="flex flex-row items-center gap-1 px-2 py-2 mt-2 text-xs rounded-lg whitespace-nowrap border-box text-muted-foreground">
            <NoticeIcon width="18" height="18" />
            사업자등록증 사본을 {import.meta.env.VITE_EMAIL}로 보내주세요
          </div>
        </div>

        <div className="w-full">
          <Label htmlFor={addressID} subLabel={required}>
            가게 주소
          </Label>
          <div className="flex flex-col gap-2">
            <Input
              id={addressID}
              placeholder="가게 주소를 입력해주세요"
              value={formData.address}
              onChange={e =>
                setFormData(prev => ({
                  ...prev,
                  address: e.target.value.trim(),
                }))
              }
            />
            <Input
              placeholder="상세주소를 입력해주세요"
              value={formData.detailAddress}
              onChange={e =>
                setFormData(prev => ({
                  ...prev,
                  detailAddress: e.target.value.trim() || undefined,
                }))
              }
            />
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          className="w-full mt-4"
          onClick={onSubmit}
        >
          입점 신청하기
        </Button>
      </div>
    </CommonLayout>
  )
}
