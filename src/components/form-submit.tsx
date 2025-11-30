import useMutateData from "./use-mutate-data"

interface ApiResponse {
    success: boolean;
    message: string;
}

export default function FormSubmit(url : string, authToken : string, method : any)
{        
    const mutation = useMutateData<ApiResponse>(url, authToken, method);

    return mutation;
}