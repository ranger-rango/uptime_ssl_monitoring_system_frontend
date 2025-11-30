import { RbacRouteHandler } from '@/components/rbac-route-handler'
import AddGroupServicePage from '@/pages/add-group-service'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/add-group-service')({
  beforeLoad : () => 
  {
    RbacRouteHandler(["ADMIN"])
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <AddGroupServicePage />
}
