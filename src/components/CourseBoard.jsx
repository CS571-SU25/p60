import {Button, Col, Container, Form, Pagination, Row} from "react-bootstrap";
import {useState, useEffect} from "react";
import Course from "./Course";

export default function CourseBoard() {
    const [courses, setCourses] = useState([]);
    const [courseNameFilter, setCourseNameFilter] = useState("");
    const [courseHolesFilter, setCourseHolesFilter] = useState("");

    useEffect(() => {
        fetch('https://cs571api.cs.wisc.edu/rest/su25/bucket/golfcourses', {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => console.log(data))
            .catch(err => console.error('Fetch error:', err));

    }, []);

    const filteredCourses = courses.filter(course => course.results.courseName.toLowerCase().includes(courseNameFilter)
        && course.results.numHoles.includes(courseHolesFilter));

    const resetFilters = () => {
        setCourseNameFilter("");
        setCourseHolesFilter("")
    }

    return (
        <div>
            <h1>Golf Today</h1>
            {/*<p>Search for students below!</p>*/}
            <hr/>
            <Form>
                <Form.Label htmlFor="searchName">Course Name</Form.Label>
                <Form.Control
                    id="searchName"
                    value={courseNameFilter}
                    onChange={(e) => {
                        setCourseNameFilter(e.target.value);
                    }}
                />
                <Form.Label htmlFor="searchNumHoles">Number of Holes</Form.Label>
                <Form.Control
                    id="searchNumHoles"
                    value={courseHolesFilter}
                    onChange={(e) => {
                        setCourseHolesFilter(e.target.value);
                    }}
                />
                <br/>
                <Button variant="outline-dark" onClick={resetFilters}>
                    Reset Search
                </Button>
            </Form>
            <Container fluid>
                <Row>
                    <p>There are {filteredCourses.length} courses matching your search.</p>
                    {
                        courses.length > 0 ? courses.map(course => (
                            <Col xs={12} sm={12} md={6} lg={4} xl={3} key={course.name}>
                                <Course {...course} />
                            </Col>
                        )) : <p>Course(s) loading...</p>
                    }
                </Row>
            </Container>
            {/*{totalPages > 1 && (*/}
            {/*    <Pagination>*/}
            {/*        <Pagination.Prev*/}
            {/*            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}*/}
            {/*            disabled={currentPage === 1}*/}
            {/*        />*/}
            {/*        {getPaginationItems()}*/}
            {/*        <Pagination.Next*/}
            {/*            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}*/}
            {/*            disabled={currentPage === totalPages}*/}
            {/*        />*/}
            {/*    </Pagination>*/}
            {/*)}*/}
        </div>
    );
}