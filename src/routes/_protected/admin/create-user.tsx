import { RbacRouteHandler } from '@/components/rbac-route-handler'
import CreateUserPage from '@/pages/create-user'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/create-user')({
  beforeLoad : () => 
  {
    RbacRouteHandler(["ADMIN"])
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateUserPage />
}
