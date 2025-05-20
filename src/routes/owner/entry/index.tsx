import { useEffect, useId, useState } from 'react'

import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { useStoresMutation } from '@/apis/caches/stores/index.mutation'
import { useStoresStatusQuery } from '@/apis/caches/stores/status.query'
import { useStoreImageUploadMutation } from '@/apis/caches/stores/upload.mutation'
import { Button } from '@/components/airbnbs/button'
import { Input } from '@/components/airbnbs/input'
import { Label } from '@/components/airbnbs/label'
import { CloseIcon } from '@/components/base/svgs/CloseIcon'
import { NoticeIcon } from '@/components/base/svgs/NoticeIcon'
import { CommonLayout } from '@/components/layouts/pages/CommonLayout'
import { useAccessToken, withAccessToken } from '@/contexts/AccessToken.context'

export const Route = createFileRoute('/owner/entry/')({
  component: withAccessToken(Entry, 'OWNER'),
})

const required = <span className="text-[#DD3F57]">필수</span>
const optional = '선택'

interface FormData {
  BRN: string
  storeName: string
  branchName?: string
  mainImage?: string
  address: string
  detailAddress?: string
}

function Entry() {
  const { idToken, update } = useAccessToken()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    BRN: '',
    storeName: '',
    branchName: undefined,
    mainImage: '',
    address: '',
    detailAddress: undefined,
  })

  const storeStatusQuery = useStoresStatusQuery()
  const storeImageUploadMutation = useStoreImageUploadMutation()
  const storesMutation = useStoresMutation()

  useEffect(() => {
    if (storeStatusQuery.data === undefined) {
      return
    }

    if (storeStatusQuery.data?.status === 'PENDING') {
      navigate({ to: '/owner/entry/waiting' })
      return
    }

    if (storeStatusQuery.data?.status !== null) {
      navigate({ to: '/' })
      return
    }
  }, [storeStatusQuery.data?.status])

  const BRNID = useId()
  const shopNameID = useId()
  const branchNameID = useId()
  const mainImageID = useId()
  const addressID = useId()

  const isInvalid =
    formData.BRN.length !== 10 ||
    formData.storeName.length === 0 ||
    formData.address.length === 0

  const onChange = (fn: (prev: FormData) => FormData) => {
    if (storesMutation.isPending || storeImageUploadMutation.isPending) {
      return
    }
    setFormData(fn)
  }
  const onSubmit = () => {
    if (isInvalid) {
      return
    }

    if (storesMutation.isPending) {
      return
    }

    storesMutation.mutate(
      {
        businessNumber: Number(formData.BRN),
        storeName: formData.storeName,
        branchName: formData.branchName ?? '',
        addressCity: formData.address,
        addressDetail: formData.detailAddress ?? '',
        addressStreet: '',
        image: formData.mainImage ?? '',
        ownerId: idToken.userId,
      },
      {
        onSuccess: () => {
          update('id_token', {
            idToken: {
              ...(idToken as any),
              storeApproved: false,
            },
          })

          navigate({ to: '/owner/entry/waiting' })
        },
      },
    )
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null || e.target.files.length === 0) {
      onChange(prev => ({
        ...prev,
        mainImage: undefined,
      }))
      return
    }

    if (storeImageUploadMutation.isPending) {
      return
    }

    const file = e.target.files[0]
    storeImageUploadMutation.mutate(
      { file },
      {
        onSuccess: data => {
          onChange(prev => ({
            ...prev,
            mainImage: data.imageUrl,
          }))
        },
      },
    )
  }

  return (
    <CommonLayout seamless title="가게 입점">
      <div className="flex flex-col items-start justify-start w-full gap-8 pb-24">
        <div className="w-full">
          <Label
            htmlFor={BRNID}
            subLabel={required}
            description="사업자등록번호를 입력해주세요"
          >
            사업자등록번호
          </Label>
          <Input
            id={BRNID}
            placeholder="사업자등록번호를 입력해주세요"
            maxLength={10}
            value={formData.BRN}
            onChange={e =>
              onChange(prev => ({
                ...prev,
                BRN: e.target.value.trim().replaceAll(/[^0-9]/g, ''),
              }))
            }
          />
          <div className="flex flex-row items-center gap-1 px-2 py-2 mt-2 text-xs rounded-lg whitespace-nowrap border-box text-muted-foreground">
            <NoticeIcon width="18" height="18" />
            사업자등록증 사본을 {import.meta.env.VITE_EMAIL}로 보내주세요
          </div>
        </div>
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
            value={formData.storeName}
            onChange={e =>
              onChange(prev => ({
                ...prev,
                storeName: e.target.value,
              }))
            }
            onBlur={() =>
              onChange(prev => ({
                ...prev,
                storeName: prev.storeName.trim(),
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
              onChange(prev => ({
                ...prev,
                branchName: e.target.value || undefined,
              }))
            }
            onBlur={() =>
              onChange(prev => ({
                ...prev,
                branchName: prev.branchName?.trim(),
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
          {formData.mainImage ? (
            <div className="relative w-full overflow-hidden bg-black rounded-md">
              <img
                src={formData.mainImage}
                alt="가게 대표 이미지"
                className="object-cover w-full h-auto"
              />
              <button
                type="button"
                onClick={() =>
                  onChange(prev => ({ ...prev, mainImage: undefined }))
                }
                className="absolute p-1 bg-white border-black rounded-full shadow-md top-2 right-2 opacity-70"
                aria-label="이미지 삭제"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Input
              id={mainImageID}
              type="file"
              accept="image/*"
              placeholder={'가게 대표 이미지를 선택해주세요'}
              onChange={onFileChange}
            />
          )}
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
                onChange(prev => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              onBlur={() =>
                onChange(prev => ({
                  ...prev,
                  address: prev.address?.trim(),
                }))
              }
            />
            <Input
              placeholder="상세주소를 입력해주세요"
              value={formData.detailAddress}
              onChange={e =>
                onChange(prev => ({
                  ...prev,
                  detailAddress: e.target.value.trim() || undefined,
                }))
              }
              onBlur={() =>
                onChange(prev => ({
                  ...prev,
                  detailAddress: prev.detailAddress?.trim(),
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
          disabled={isInvalid}
        >
          입점 신청하기
        </Button>
      </div>
    </CommonLayout>
  )
}
