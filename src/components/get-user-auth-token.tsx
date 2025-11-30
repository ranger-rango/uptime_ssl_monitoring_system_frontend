
export function getUserAuthToken()
{
    const userDetails : any = JSON.parse(localStorage.getItem("userDetails") || sessionStorage.getItem("userDetails") || "{}")
    return userDetails["auth_token"]
}