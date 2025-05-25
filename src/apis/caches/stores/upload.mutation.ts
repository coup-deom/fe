import { FETCHER } from '@/apis/fetcher'
import { useMutation } from '@tanstack/react-query'

interface Body {
  file: File
}
interface UseStoreImageUploadMutationResponse {
  imageUrl: string
}
export function useStoreImageUploadMutation() {
  return useMutation({
    mutationFn: async (props: Body) => {
      // multipart/form-data로 전송하기 위해 FormData를 사용합니다.
      const data = new FormData()
      data.append('file', props.file)

      return (
        await FETCHER.post<{ data: UseStoreImageUploadMutationResponse }>(
          '/stores/upload',
          data,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        )
      ).data.data
    },
    mutationKey: ['stores', 'upload'],
  })
}
