import { createFileRoute } from '@tanstack/react-router'

import { CommonLayout } from '@/components/layouts/CommonLayout'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return <CommonLayout>hello world</CommonLayout>
}
