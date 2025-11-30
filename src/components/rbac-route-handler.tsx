import { redirect } from "@tanstack/react-router";
import { getUserRole } from "./get-user-role";


export function RbacRouteHandler(allowedRoles : string[])
{
    const userRole : string = getUserRole()
    const hasAuth : Boolean = allowedRoles.includes(userRole)

    if (!hasAuth)
    {
        throw redirect({to: "/dashboard"})
    }

}