import { createFileRoute, Link } from '@tanstack/react-router'

import { FullScreenLayout } from '@/components/layouts/pages/FullScreenLayout'
import { withoutAccessToken } from '@/contexts/AccessToken.context'

export const Route = createFileRoute('/signin/')({
  beforeLoad: withoutAccessToken,
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <FullScreenLayout>
      <div className="flex flex-col items-center w-6/12 max-w-xl gap-2">
        <h1 className="font-black pb-36">덤</h1>
        <span className="pb-4 text-sm font-medium text-stone-700">
          쿠폰이 기다리고 있어요!
        </span>
        <div className="flex flex-row items-center justify-center w-full gap-6">
          <Link
            to={import.meta.env.VITE_API_HOST + '/oauth2/authorization/google'}
          >
            <img
              className="rounded-full border-1 shadow-2xs aspect-square"
              width="36px"
              src="/oauth/google-signin.png"
              alt="구글 로그인"
            ></img>
          </Link>
          <Link
            to={import.meta.env.VITE_API_HOST + '/oauth2/authorization/naver'}
          >
            <img
              className="rounded-full border-1 shadow-2xs aspect-square"
              width="36px"
              src="/oauth/naver-signin.png"
              alt="네이버 로그인"
            ></img>
          </Link>
          <Link
            to={import.meta.env.VITE_API_HOST + '/oauth2/authorization/kakao'}
          >
            <img
              className="rounded-full border-1 shadow-2xs aspect-square"
              width="36px"
              src="/oauth/kakao-signin.png"
              alt="카카오 로그인"
            />
          </Link>
        </div>
      </div>
    </FullScreenLayout>
  )
}
