import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Profile()
{
    const navigate = useNavigate();
    const username = localStorage.getItem("loggedInUser") || "Unknown User";

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleLogout = () =>
    {
        localStorage.removeItem("loggedInUser");
        navigate(0); // Reload to return to AuthPage
    };

    const handleClearFavorites = () =>
    {
        localStorage.removeItem("favorites");
        alert("Favorites cleared!");
    };

    const handleChangePassword = () =>
    {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const index = users.findIndex(u => u.username === username);

        // Edge case: user record missing
        if (index === -1)
        {
            alert("Unexpected error: user not found.");
            return;
        }

        // Edge case: empty fields
        if (!oldPassword || !newPassword)
        {
            alert("Please enter both your old and new password.");
            return;
        }

        // Edge case: old password doesn't match
        if (users[index].password !== oldPassword)
        {
            alert("Old password is incorrect.");
            return;
        }

        // Edge case: new password same as old
        if (oldPassword === newPassword)
        {
            alert("New password cannot be the same as the old password.");
            return;
        }

        // Edge case: enforce a simple minimum length rule (optional)
        if (newPassword.length < 4)
        {
            alert("New password must be at least 4 characters.");
            return;
        }

        // Update password
        users[index].password = newPassword;
        localStorage.setItem("users", JSON.stringify(users));
        alert("Password changed successfully!");

        // Reset inputs
        setOldPassword("");
        setNewPassword("");
    };

    return (
        <div style={{padding: "2rem"}}>
            <h1>Profile</h1>
            <p><strong>User:</strong> {username}</p>

            <h2>Change Password</h2>
            <div style={{marginBottom: "1rem"}}>
                <input
                    type="password"
                    placeholder="Old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    style={{marginRight: "0.5rem"}}
                />
                <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{marginRight: "0.5rem"}}
                />
                <button onClick={handleChangePassword}>Change</button>
            </div>

            <button onClick={handleClearFavorites} style={{marginRight: "1rem"}}>
                Clear All Favorites
            </button>
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}
