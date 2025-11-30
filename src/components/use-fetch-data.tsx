import axios from "axios"
import { useQuery } from "@tanstack/react-query"

async function fetchData(url : string, token : string)
{
    const { data } = await axios.get(url, 
        {
            headers : 
            {
                "Content-Type" : "application/json",
                "X-Auth-Key" : `${token}` 
            },
        }
    );
    return data;
}

export default function useFetchData(url : string, token : string)
{
    return useQuery(
        {
            queryKey : ["fetchData", url, token],
            queryFn : () => fetchData(url, token),
            enabled : !!url && !!token
        }
    );
}