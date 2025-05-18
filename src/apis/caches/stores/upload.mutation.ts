import { useMutation } from '@tanstack/react-query'

import { FETCHER } from '@/apis/fetcher'

interface Body {
  file: File
}
interface UseStoreImageUploadMutationResponse {
  imageUrl: string
}
export function useStoreImageUploadMutation() {
  return useMutation({
    mutationFn: async (props: Body) => {
      const file = await props.file.text()
      return (
        await FETCHER.post<{ data: UseStoreImageUploadMutationResponse }>(
          '/stores/upload',
          { file },
        )
      ).data.data
    },
    mutationKey: ['/stores/upload'],
  })
}
