
export function getUserRole()
{
    const userDetails : any = JSON.parse(localStorage.getItem("userDetails") || sessionStorage.getItem("userDetails") || "{}")
    return userDetails["role_title"]
}