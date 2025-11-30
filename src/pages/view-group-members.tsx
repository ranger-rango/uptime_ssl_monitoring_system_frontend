import { getUserAuthToken } from "@/components/get-user-auth-token"
import TableManager from "@/components/table-manager"

interface ContactGrpProps
{
    groupId : string
}

export default function ViewGroupMembersPage( { groupId } : ContactGrpProps )
{
    const endpoint = import.meta.env.VITE_GET_GROUP_MEMBERS_ENDPOINT
    const baseUrl : string = import.meta.env.VITE_BASE_URL
    const url = baseUrl.concat(endpoint).concat("/").concat(groupId)
    const authToken : string = getUserAuthToken()
    console.log(url)

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
            columnName : "Notification Channel",
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
            <TableManager url={url} authToken={authToken} ColHeaders={colHeaders} />
        </>
    )
}