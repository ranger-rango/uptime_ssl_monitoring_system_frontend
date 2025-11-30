import { RbacRouteHandler } from '@/components/rbac-route-handler'
import ViewUsersPage from '@/pages/view-users'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/view-users')({
  beforeLoad : () => 
  {
    RbacRouteHandler(["ADMIN"])
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <ViewUsersPage />
}
