import FormBuilder from "@/components/form-builder";
import { registrationFormSchema } from "@/components/form_schemas/register-form";
import toast from "react-hot-toast";

interface regProps
{
    registrationId : string
}

export default function RegistrationPage({ registrationId } : regProps)
{
    const prefixEndpoint : string = import.meta.env.VITE_REGISTER_ENDPOINT
    const endpoint : string = prefixEndpoint.concat("/").concat(registrationId)
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
        <div className="auth-container">
            <FormBuilder endpoint={endpoint} authToken="GUEST" method="POST"  formSchema={registrationFormSchema} responseHandler={responseHandler} />
        </div>
    )
}