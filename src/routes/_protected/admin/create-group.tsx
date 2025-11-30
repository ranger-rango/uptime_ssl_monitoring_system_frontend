import { RbacRouteHandler } from '@/components/rbac-route-handler'
import CreateContactGroupPage from '@/pages/create-group'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/create-group')({
  beforeLoad : () => 
  {
    RbacRouteHandler(["ADMIN"])
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateContactGroupPage />
}
