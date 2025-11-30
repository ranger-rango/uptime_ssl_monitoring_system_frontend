import axios from "axios";
import type { Method } from "axios" 
import { useMutation } from "@tanstack/react-query";

async function mutateData<T>(url : string, token : string, method : Method, updateData ?: any) : Promise<T | null>
{
    const isFormData = updateData instanceof FormData;

    const headers = {
        ...(isFormData ? {} : { "Content-Type" : "application/json" }),
        "X-Auth-Key" : `${token}`
    };

    const { data } = await axios.request<T>(
        {
            url,
            method, 
            headers,
            data : ["POST", "PUT", "PATCH", "DELETE"].includes(method.toUpperCase()) ? updateData : undefined
        }
    );

    return data ?? null
}

export default function useMutateData<T>(url : string, token : string, method : Method)
{
    return useMutation<T | null, Error, any>(
        {
            mutationFn : (updateData ?: any) => mutateData<T>(url, token, method, updateData)
        }
    );
}