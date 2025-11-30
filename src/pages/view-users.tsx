import { getUserAuthToken } from "@/components/get-user-auth-token"
import TableManager from "@/components/table-manager"
import { Link } from "@tanstack/react-router"

export default function ViewUsersPage()
{
    const endpoint = import.meta.env.VITE_GET_USERS_ENDPOINT
    const baseUrl : string = import.meta.env.VITE_BASE_URL
    const url = baseUrl.concat(endpoint)
    const authToken : string = getUserAuthToken()

    const colHeaders : any[] = [
        {
            id : "user_id",
            columnName : "UserId",
            hide : false,
            render : false
        },
        {
            id : "role_title",
            columnName : "Role Title",
            hide : false,
            render : false
        },
        {
            id : "channel_title",
            columnName : "Channel Title",
            hide : false,
            render : false
        },
        {
            id : "email_address",
            columnName : "Email Address",
            hide : false,
            render : false
        },
        {
            id : "tel",
            columnName : "Tel",
            hide : false,
            render : false
        },
        {
            id : "telegram",
            columnName : "Telegram",
            hide : false,
            render : false
        },
        {
            id : "first_name",
            columnName : "First Name",
            hide : false,
            render : false
        },
        {
            id : "middle_name",
            columnName : "Middle Name",
            hide : false,
            render : false
        },
        {
            id : "surname",
            columnName : "Surname",
            hide : false,
            render : false
        }
    ]
    return (
        <>
            <div className="link-btns-container">
                <Link className="link-button pri-btn" to="/admin/create-user">
                    Create User
                </Link>
            </div>
            <TableManager url={url} authToken={authToken} ColHeaders={colHeaders} />
        </>
    )
}