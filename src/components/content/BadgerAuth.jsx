import {useState} from "react";

export default function AuthPage({onLogin})
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("login"); // "login" or "register"

    const handleSubmit = () =>
    {
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        if (mode === "register")
        {
            if (users.find(u => u.username === username))
            {
                alert("Username already exists");
                return;
            }
            users.push({username, password});
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("loggedInUser", username);
            onLogin(username);
        }
        else
        {
            const user = users.find(u => u.username === username && u.password === password);
            if (user)
            {
                localStorage.setItem("loggedInUser", username);
                onLogin(username);
            }
            else
            {
                alert("Invalid username or password");
            }
        }
    };

    return (
        <div style={{padding: "2rem"}}>
            <h1>{mode === "login" ? "Login" : "Register"}</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            /><br/>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            /><br/>
            <button onClick={handleSubmit}>
                {mode === "login" ? "Login" : "Register"}
            </button>
            <p>
                {mode === "login" ? "No account?" : "Already have an account?"}{" "}
                <button onClick={() => setMode(mode === "login" ? "register" : "login")}>
                    {mode === "login" ? "Register here" : "Login here"}
                </button>
            </p>
        </div>
    );
}
