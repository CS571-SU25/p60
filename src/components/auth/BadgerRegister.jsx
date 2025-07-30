import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router';

export default function BadgerRegister()
{

    // TODO Create the register component.
    const [username, setUsername] = useState('');
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const navigate = useNavigate();

    const handleRegister = () =>
    {
        // 1. Check if username and pin are entered
        if (!username || !pin)
        {
            alert("You must provide both a username and pin!");
            return;
        }

        // 2. Check if pin is 7 digits
        if (!/^\d{7}$/.test(pin) || !/^\d{7}$/.test(confirmPin))
        {
            alert("Your pin must be a 7-digit number!");
            return;
        }

        // 3. Check if pins match
        if (pin !== confirmPin)
        {
            alert("Your pins do not match!");
            return;
        }

        // 4. Make API call
        fetch('https://cs571api.cs.wisc.edu/rest/su25/hw6/register', {
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
        })
            .then(res =>
            {
                // Save status so we can check it later
                const status = res.status;
                return res.json().then(data => ({status, data}));
            })
            .then(({status, data}) =>
            {
                console.log("API Response:", status, data); // Debug

                if (status === 409)
                {
                    alert("That username has already been taken!");
                }
                else if (status === 200)
                {
                    alert("Successfully registered!");
                    navigate('/');
                }
                else
                {
                    alert(data.msg || "An error occurred. Please try again.");
                }
            });


    };


    return <>
        <h1>Register</h1>
        <Form>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="pin">
                <Form.Label>Pin</Form.Label>
                <Form.Control
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter 7-digit pin"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPin">
                <Form.Label>Confirm Pin</Form.Label>
                <Form.Control
                    type="password"
                    value={confirmPin}
                    onChange={(e) => setConfirmPin(e.target.value)}
                    placeholder="Confirm 7-digit pin"
                />
            </Form.Group>

            <Button variant="primary" onClick={handleRegister}>Register</Button>
        </Form>
    </>
}
