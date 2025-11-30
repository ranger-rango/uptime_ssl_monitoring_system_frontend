import ViewProfilePage from '@/pages/view-profile'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/view-profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ViewProfilePage />
}
