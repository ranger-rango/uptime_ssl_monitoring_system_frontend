import FormBuilder from "@/components/form-builder";
import { addContactGroups, addGroupMemberFormSchema } from "@/components/form_schemas/add-group-member";
import useFetchData from "@/components/use-fetch-data";
import toast from "react-hot-toast";

function usefetchContactGroups()
{
    const endpoint = import.meta.env.VITE_GET_GROUPS_ENDPOINT
    const baseUrl : string = import.meta.env.VITE_BASE_URL
    const url : string = baseUrl.concat(endpoint);
    const userDetails : any = JSON.parse(localStorage.getItem("userDetails") || sessionStorage.getItem("userDetails") || "{}")
    const authToken : string = userDetails["auth_token"]
    const {data, isLoading, error } = useFetchData(url, authToken)
    const groups : { [key: string]: string } = {};
    if (!data || typeof data !== "object")
    {
        return {}
    }
    Object.values(data).forEach((group : any) => 
    {
        groups[group.contact_group_id] = group.group_name
    })
    if (isLoading || error) {}
    return groups
}

export default function AddGroupMemberPage()
{
    const contactGroupNames = usefetchContactGroups();
    const contactGroupOptions = addContactGroups(contactGroupNames);
    const formSchema = addGroupMemberFormSchema(contactGroupOptions);
    const userDetails : any = JSON.parse(localStorage.getItem("userDetails") || sessionStorage.getItem("userDetails") || "{}")
    const authToken : string = userDetails["auth_token"]
    const endpoint = import.meta.env.VITE_ADD_GROUP_MEMBER_ENDPOINT

    const responseHandler : any = async (data : any) => 
    {
        const createUserScuccess : any = data?.status
        const createUserFail : any = data?.err_status
        if (createUserScuccess)
        {
            toast.success(createUserScuccess)
        }
        if (createUserFail)
        {
            toast.error(createUserFail)
        }
    }
    return (
        <>
            <FormBuilder endpoint={endpoint} authToken={authToken} method="POST" formSchema={formSchema} responseHandler={responseHandler} />
        </>
    )
}