import React, {useState} from "react";
import {Button, ButtonToolbar, CloseButton, Container, Nav, Navbar, NavbarText} from "react-bootstrap";
import {Link, Outlet} from "react-router";

import crest from '../../assets/uw-crest.svg'
import LoginStatusContext from "../contexts/LoginStatusContext.js";

function BadgerLayout()
{
    const [loginStatus, setLoginStatus] = useState(null); // no login anymore

    return (
        <div>
            <Navbar
                expand="lg"
                style={{
                    backgroundColor: "#228B22", // green color
                }}
            >
                <Container>
                    <Navbar.Brand
                        as={Link}
                        to="/"
                        style={{color: "black"}} // ensure text is white
                    >
                        <img
                            alt="BadgerChat Logo"
                            src={crest}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        GolfToday
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" style={{color: "black"}}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/courses" style={{color: "black"}}>Courses</Nav.Link>
                        <Nav.Link as={Link} to="/favorites" style={{color: "black"}}>Favorites</Nav.Link>
                        <Nav.Link as={Link} to="/profile" style={{color: "black"}}>Profile & Settings</Nav.Link>
                        <Nav.Link as={Link} to="/stats" style={{color: "black"}}>Stats</Nav.Link>
                        <Nav.Link as={Link} to="/contact" style={{color: "black"}}>Contact Us</Nav.Link>
                        <button
                            className="nav-link logout-link"
                            style={{
                                background: "transparent",
                                border: "none",
                                color: "black",
                                padding: 0,
                                cursor: "pointer"
                            }}
                            onClick={() =>
                            {
                                localStorage.removeItem("loggedInUser");
                                window.location.reload();
                            }}
                        >
                            Logout
                        </button>
                    </Nav>
                </Container>
            </Navbar>
            <div style={{margin: "1rem"}}>
                <LoginStatusContext.Provider value={[loginStatus, setLoginStatus]}>
                    <Outlet/>
                </LoginStatusContext.Provider>
            </div>
        </div>
    );
}

export default BadgerLayout;
