import {Container, Card, ListGroup} from "react-bootstrap";

export default function ContactUs()
{
    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <Card style={{width: "100%", maxWidth: "600px", boxShadow: "0px 4px 8px rgba(0,0,0,0.1)"}}>
                <Card.Body>
                    <Card.Title className="text-center mb-4">Contact Us</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <strong>Email:</strong> <a href="mailto:shpakov@wisc.edu">shpakov@wisc.edu</a>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Phone:</strong> <a href="tel:+18475303218">(847) 530-3218</a>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Mailing Address:</strong>
                            <div>124 Langdon Street</div>
                            <div>Madison, WI</div>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Container>
    );
}
