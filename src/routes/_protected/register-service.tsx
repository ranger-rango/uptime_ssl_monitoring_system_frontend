import RegisterServicePage from '@/pages/register-service'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/register-service')({
  component: RouteComponent,
})

function RouteComponent() {
  return <RegisterServicePage />
}
