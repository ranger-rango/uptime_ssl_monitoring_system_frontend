import { RbacRouteHandler } from '@/components/rbac-route-handler'
import AddGroupMemberPage from '@/pages/add-group-member'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/add-group-member')({
  beforeLoad : () => 
  {
    RbacRouteHandler(["ADMIN"])
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <AddGroupMemberPage />
}
