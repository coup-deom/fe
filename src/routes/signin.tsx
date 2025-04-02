import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signin')({
  component: RouteComponent,
  beforeLoad: () => null,
})

/**
 * google oauth
 * https://developers.google.com/identity/sign-in/web/sign-in?hl=ko
 */
function RouteComponent() {
  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center w-6/12 max-w-xl gap-2">
          <h1 className="font-black pb-36">덤</h1>
          <span className="pb-4 text-sm font-medium text-stone-700">
            쿠폰이 기다리고 있어요!
          </span>
          <div className="flex flex-row items-center justify-center w-full gap-6">
            <img
              className="rounded-full border-1 shadow-2xs aspect-square"
              width="36px"
              src="/oauth/google-signin.png"
              alt="구글 로그인"
            ></img>
            <img
              className="rounded-full border-1 shadow-2xs aspect-square"
              width="36px"
              src="/oauth/naver-signin.png"
              alt="네이버 로그인"
            ></img>
            <img
              className="rounded-full border-1 shadow-2xs aspect-square"
              width="36px"
              src="/oauth/kakao-signin.png"
              alt="카카오 로그인"
            />
          </div>
        </div>
      </div>
    </>
  )
}
