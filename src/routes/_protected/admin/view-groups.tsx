import { RbacRouteHandler } from '@/components/rbac-route-handler'
import ViewContactGroupsPage from '@/pages/view-groups'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/view-groups')({
  beforeLoad : () => 
  {
    RbacRouteHandler(["ADMIN", "OPERATOR"])
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <ViewContactGroupsPage />
}
