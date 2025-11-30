import { getUserAuthToken } from "@/components/get-user-auth-token"
import useMutateData from "@/components/use-mutate-data"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"
import toast from "react-hot-toast"

export function useLogoutEffect()
{
    const responseHandlerError: any = async (_error: any) => {
        toast.success("user logout Scuccesful")
    }
    const responseHandler : any = async (data : any) =>
    {
        const logoutUserScuccess : any = data?.status
        const logoutUserFail : any = data?.err_status
        if (logoutUserScuccess)
        {
            queryClient.clear()
            toast.success(logoutUserScuccess)
        }
        if (logoutUserFail)
        {
            queryClient.clear()
            toast.error(logoutUserFail)
        }
        sessionStorage.clear()
        localStorage.clear()
        navigate({to:"/auth/login"})
    }

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    
    const userDetails : any = JSON.parse(localStorage.getItem("userDetails") || sessionStorage.getItem("userDetails") || "{}")
    const userId = userDetails["user_id"]
    const authToken = getUserAuthToken()
    const prefixEndpoint : string = import.meta.env.VITE_LOGOUT_ENDPOINT
    const endpoint : string = prefixEndpoint.concat("/").concat(userId)
    const baseUrl : string = import.meta.env.VITE_BASE_URL
    const url : string = baseUrl.concat(endpoint)
    const method = "POST"
    
    const { mutate } = useMutateData(url, authToken, method)
    useEffect(() => 
    {
        mutate(
            undefined, 
            {
                onSuccess: (responseData) => 
                {
                    responseHandler?.(responseData)
                },
                onError: (error) => {
                responseHandlerError?.(error)
                },
                onSettled: () => {
                    queryClient.clear()
                    sessionStorage.clear()
                    localStorage.clear()
                    navigate({to:"/auth/login"})
                }
            }
            
        )
    }, [mutate])


    return null
}