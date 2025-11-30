import FormBuilder from "@/components/form-builder"
import { createContactGroupFormSchema } from "@/components/form_schemas/create-group-form"
import { getUserAuthToken } from "@/components/get-user-auth-token"
import toast from "react-hot-toast"

export default function CreateContactGroupPage()
{
    const authToken : string = getUserAuthToken()
    const endpoint = import.meta.env.VITE_CREATE_CONTACT_GROUP_ENDPOINT

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
            <FormBuilder endpoint={endpoint} authToken={authToken} method="POST" formSchema={createContactGroupFormSchema} responseHandler={responseHandler} />
        </>
    )
}