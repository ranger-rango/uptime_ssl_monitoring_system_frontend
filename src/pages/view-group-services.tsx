import { getUserAuthToken } from "@/components/get-user-auth-token"
import TableManager from "@/components/table-manager"

interface ContactGrpProps
{
    groupId : string
}

export default function ViewGroupServicesPage( { groupId } : ContactGrpProps )
{
    const endpoint = import.meta.env.VITE_GET_GROUP_SERVICES_ENDPOINT
    const baseUrl : string = import.meta.env.VITE_BASE_URL
    const url = baseUrl.concat(endpoint).concat("/").concat(groupId)
    const authToken : string = getUserAuthToken()

    const colHeaders : any[] = [
        {
            id : "service_id",
            columnName : "ServiceId",
            hide : false,
            render : false
        },
        {
            id : "service_name",
            columnName : "Service Name",
            hide : false,
            render : false
        },
        {
            id : "service_url_domain",
            columnName : "Service URL",
            hide : false,
            render : false
        },
        {
            id : "service_port",
            columnName : "Service Port",
            hide : false,
            render : false
        },
        {
            id : "svc_registration_status",
            columnName : "Svc Registration Status",
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