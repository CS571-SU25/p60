import {useState} from "react";
import {Card, Button, Form, Container} from "react-bootstrap";
import "./AuthPage.css";

export default function AuthPage({onLogin})
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("login");

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
        <Container
            fluid
            className="auth-bg d-flex flex-column align-items-center justify-content-center vh-100"
        >
            <div className="golf-ball"></div>
            <Card style={{width: "350px", padding: "1rem", boxShadow: "0px 4px 8px rgba(0,0,0,0.2)"}}>
                <Card.Body>
                    <Card.Title className="text-center mb-4">
                        {mode === "login" ? "Welcome Back to GolfToday" : "Create Your Account"}
                    </Card.Title>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button
                            variant="success"
                            className="w-100 mb-3"
                            onClick={handleSubmit}
                        >
                            {mode === "login" ? "Login" : "Register"}
                        </Button>
                    </Form>
                    <div className="text-center">
                        {mode === "login" ? "No account?" : "Already have an account?"}{" "}
                        <Button
                            variant="link"
                            onClick={() => setMode(mode === "login" ? "register" : "login")}
                        >
                            {mode === "login" ? "Register here" : "Login here"}
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}
