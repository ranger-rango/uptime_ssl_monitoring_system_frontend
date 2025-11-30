import { useLogoutEffect } from '@/pages/auth/logout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/logout')({
  component: RouteComponent,
})

function RouteComponent() {
  useLogoutEffect()
}
