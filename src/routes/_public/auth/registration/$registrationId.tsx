import RegistrationPage from '@/pages/auth/registration'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_public/auth/registration/$registrationId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { registrationId } : any = Route.useParams();
  return <RegistrationPage registrationId={registrationId} />
}
