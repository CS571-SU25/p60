import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";

export default function Profile()
{
    const navigate = useNavigate();
    const username = localStorage.getItem("loggedInUser") || "Unknown User";

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleLogout = () =>
    {
        localStorage.removeItem("loggedInUser");
        navigate(0); // reload
    };

    const handleClearFavorites = () =>
    {
        const key = `favorites_${username}`;
        localStorage.removeItem(key);
    };

    const handleChangePassword = () =>
    {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const index = users.findIndex(u => u.username === username);

        if (index === -1) return alert("Unexpected error: user not found.");
        if (!oldPassword || !newPassword) return alert("Please enter both old and new password.");
        if (users[index].password !== oldPassword) return alert("Old password is incorrect.");
        if (oldPassword === newPassword) return alert("New password cannot be the same as the old password.");
        if (newPassword.length < 4) return alert("New password must be at least 4 characters.");

        users[index].password = newPassword;
        localStorage.setItem("users", JSON.stringify(users));
        alert("Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
    };

    return (
        <div style={{padding: "2rem", maxWidth: "700px"}}>
            <h1>Profile</h1>
            <p><strong>User:</strong> {username}</p>

            <h2 className="mt-4">Change Password</h2>
            <Form className="mt-3">
                <Row className="align-items-end">
                    <Col md={5}>
                        <Form.Group controlId="oldPassword">
                            <Form.Label>Old password</Form.Label>
                            <Form.Control
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group controlId="newPassword">
                            <Form.Label>New password</Form.Label>
                            <Form.Control
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md="auto">
                        <Button variant="primary" onClick={handleChangePassword}>
                            Change
                        </Button>
                    </Col>
                </Row>
            </Form>

            <div className="mt-4">
                <Button
                    variant="outline-danger"
                    className="me-2"
                    onClick={handleClearFavorites}
                >
                    Clear All Favorites
                </Button>
                <Button variant="secondary" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </div>
    );
}
