// import "../../stylesheets/Navbar.css";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router";
// import golftodayLogo from '../../../public/golftodayLogo.png'

export default function GolfTodayNavbar() {
    return <Navbar style={{backgroundColor: "#6E9A4D", height: "80px"}} variant="light" expand="sm" collapseOnSelect>
        <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Brand as={Link} to={"/"}>
                <img
                    alt="GolfToday Logo"
                    src="golftodayLogo.png"
                    width="140"
                    height="140"
                    className="d-inline-block align-top"
                />{' '}
            </Navbar.Brand>
            <Navbar.Collapse id="responsive-navbar-nav" className="me-auto">
                <Nav>
                    <Nav.Link as={Link} to="/" style={{ color: "white" }} onMouseEnter={e => {
                        e.target.style.transform = "scale(1.2)";
                        e.target.style.fontSize = "1.1rem";
                    }}
                              onMouseLeave={e => {
                                  e.target.style.transform = "scale(1)";
                                  e.target.style.fontSize = "1rem";
                              }}>Home</Nav.Link>
                    <Nav.Link as={Link} to="/about-us" style={{ color: "white" }} onMouseEnter={e => {
                        e.target.style.transform = "scale(1.2)";
                        e.target.style.fontSize = "1.1rem";
                    }}
                              onMouseLeave={e => {
                                  e.target.style.transform = "scale(1)";
                                  e.target.style.fontSize = "1rem";
                              }}>About Us</Nav.Link>
                    <Nav.Link as={Link} to="/contact" style={{ color: "white" }} onMouseEnter={e => {
                        e.target.style.transform = "scale(1.2)";
                        e.target.style.fontSize = "1.1rem";
                    }}
                              onMouseLeave={e => {
                                  e.target.style.transform = "scale(1)";
                                  e.target.style.fontSize = "1rem";
                              }}>Contact</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>

}