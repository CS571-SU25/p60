import React, {useRef} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router';
import {useContext} from 'react';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerLogin()
{

    // TODO Create the login component.
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    const usernameRef = useRef();
    const pinRef = useRef();
    const navigate = useNavigate();

    const handleLogin = () =>
    {
        const username = usernameRef.current.value.trim();
        const pin = pinRef.current.value.trim();

        // 1. Check if username and pin are entered
        if (!username || !pin)
        {
            alert("You must provide both a username and pin!");
            return;
        }

        // 2. Check if pin is 7 digits
        if (!/^\d{7}$/.test(pin))
        {
            alert("Your pin is a 7-digit number!");
            return;
        }

        // 3. Make API call
        fetch('https://cs571api.cs.wisc.edu/rest/su25/hw6/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: "include",
            body: JSON.stringify({
                username: username,
                pin: pin
            })
        }).then(res =>
        {
            if (res.status === 401)
            {
                alert("Incorrect username or pin!");
            }
            else if(res.ok)
            {
                alert("Successfully logged in!");
                const loginData = {username: username}; // You can store more info if needed
                setLoginStatus(loginData);
                sessionStorage.setItem("loginStatus", JSON.stringify(loginData));
                navigate('/');
            }
        });
    };


    return <>
        <h1>Login</h1>
        <Form>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    ref={usernameRef}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="pin">
                <Form.Label>Pin</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter 7-digit pin"
                    ref={pinRef}
                />
            </Form.Group>

            <Button variant="primary" onClick={handleLogin}>Login</Button>
        </Form>
    </>
}
