import React, {useState} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, Outlet} from "react-router";

import crest from '../../assets/uw-crest.svg'
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

function BadgerLayout()
{
    const [loginStatus, setLoginStatus] = useState(() =>
    {
        const savedStatus = sessionStorage.getItem("loginStatus");
        return savedStatus ? JSON.parse(savedStatus) : null;
    });

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="BadgerChat Logo"
                            src={crest}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        BadgerChat
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {loginStatus ? (
                            <Nav.Link as={Link} to="logout">Logout</Nav.Link>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="login">Login</Nav.Link>
                                <Nav.Link as={Link} to="register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Container>
            </Navbar>
            <div style={{margin: "1rem"}}>
                <BadgerLoginStatusContext.Provider value={[loginStatus, setLoginStatus]}>
                    <Outlet/>
                </BadgerLoginStatusContext.Provider>
            </div>
        </div>
    );
}

export default BadgerLayout;
