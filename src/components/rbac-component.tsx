import { type ReactNode } from "react";
import { getUserRole } from "./get-user-role";

interface RbacProps
{
    allowedRoles : string[]
    htmlElements : ReactNode
}

export default function RbacComponents({ allowedRoles, htmlElements } : RbacProps)
{
    const userRole = getUserRole()

    const hasAuth = allowedRoles.includes(userRole)
    return (
        <>
            { hasAuth && htmlElements }
        </>
    )
}