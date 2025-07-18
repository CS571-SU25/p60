import { Col, Container, Row } from "react-bootstrap";

export default function AboutUs() {

    return <div>
        <h1>The GolfToday Mission</h1>
        <br/>
        <Container fluid={true}>
            <Row>
                <Col xs={12} lg={4} xl={6}>
                    <p>A project for CS571</p>
                    <p>University of Wisconsin - Madison</p>
                    <p>Summer 2025</p>
                    <nl>
                        Inspirations:
                        <li>Hotel Tonight: https://www.hoteltonight.com/</li>
                        <li>GolfNow: https://www.golfnow.com/</li>
                    </nl>
                </Col>
                <Col xs={12} lg={8} xl={6}>
                    <iframe width="560" height="315" src="https://youtu.be/cWMf4gKaIiM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </Col>
            </Row>
        </Container>
    </div>
}