import React, {useState} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, Outlet} from "react-router";

import crest from '../../assets/uw-crest.svg'
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

function BadgerLayout()
{
    const [loginStatus, setLoginStatus] = useState(null); // no login anymore

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
                        GolfToday
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
                        {/*<Nav.Link as={Link} to="/course-map">Map</Nav.Link>*/}
                        <Nav.Link as={Link} to="/favorites">Favorites</Nav.Link>
                        <button onClick={() =>
                        {
                            localStorage.removeItem("loggedInUser");
                            window.location.reload();
                        }}>
                            Logout
                        </button>
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
