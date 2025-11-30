import FormBuilder from "@/components/form-builder";
import { loginFormSchema } from "@/components/form_schemas/login-form";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

export default function LoginPage()
{
    const navigate = useNavigate()
    const responseHandler : any = async (data : any) =>
    {

        const userDetails : any = data?.[1]
        console.log(userDetails)
        if (userDetails !== undefined)
        {
            const authToken = userDetails["auth_token"]
            if (authToken?.split(":")[0] === "local")
            {
                localStorage.setItem("userDetails", JSON.stringify(userDetails));
            }
            else
            {
                sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
            }

            toast.success("Login Successful")
            await navigate({ to: "/dashboard" });
        }
        else
        {
            toast.error(data?.status)
        }
    }

    const endpoint : string = import.meta.env.VITE_LOGIN_ENDPOINT
    return (
        <div className="auth-container">
            <FormBuilder endpoint={endpoint} authToken="GUEST" method="POST" responseHandler={responseHandler} formSchema={loginFormSchema} />
        </div>
    )
}