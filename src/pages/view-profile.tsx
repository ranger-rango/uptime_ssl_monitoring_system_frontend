

export default function ViewProfilePage()
{
    const userDetails : any = JSON.parse(localStorage.getItem("userDetails") || sessionStorage.getItem("userDetails") || "{}")
    const toPascal : any = (str : string) => 
    {
        return str.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase()).join(" ")
    }
    return (
        <>
            <div className="user-profile-container">
                <h3> User Profile </h3>
                {
                    Object.entries(userDetails).map(([key, value]) => 
                    (
                        <div className="user-prof-div">
                            <p className="user-prof-tag"> { toPascal(key) } </p>
                            <p className="user-prof-info"> { String(value) } </p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}