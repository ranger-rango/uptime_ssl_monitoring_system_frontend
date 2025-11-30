import ViewServicesPage from '@/pages/view-services'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/view-services')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ViewServicesPage />
}
