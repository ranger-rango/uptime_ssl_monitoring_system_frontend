import { Link } from "@tanstack/react-router";

export default function UserSettingsNav()
{
    return (
        <>
            <div className="user-settings-nav">
                <Link className="user-settings-nav-link" to="/view-profile">
                    Profile
                </Link>
                <Link className="user-settings-nav-link" to="/logout">
                    Logout
                </Link>
            </div>
        </>
    )
}