import { getUserAuthToken } from "@/components/get-user-auth-token"
import RbacComponents from "@/components/rbac-component"
import TableManager from "@/components/table-manager"
import { Link } from "@tanstack/react-router"

export default function ViewContactGroupsPage()
{
    const endpoint = import.meta.env.VITE_GET_GROUPS_ENDPOINT
    const baseUrl : string = import.meta.env.VITE_BASE_URL
    const url = baseUrl.concat(endpoint)
    const authToken : string = getUserAuthToken()

    const colHeaders : any[] = [
        {
            id : "contact_group_id",
            columnName : "Group Id",
            hide : false,
            render : false
        },
        {
            id : "group_name",
            columnName : "Group Name",
            hide : false,
            render : false
        },
        {
            id : "description",
            columnName : "Description",
            hide : false,
            render : false
        }
    ]
    return (
        <>
            <div className="link-btns-container">
                <RbacComponents 
                    allowedRoles={["ADMIN"]}
                    htmlElements={
                        <>
                            <Link className="link-button pri-btn" to="/admin/add-group-member">
                                Add Member
                            </Link>
                            <Link className="link-button pri-btn" to="/admin/add-group-service">
                                Add Service
                            </Link>
                            <Link className="link-button pri-btn" to="/admin/create-group">
                                Create Group
                            </Link>
                        </>
                    }
                />
            </div>
            <TableManager url={url} authToken={authToken} ColHeaders={colHeaders} table="GROUPS" />
        </>
    )
}