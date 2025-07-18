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
            .then(data => {
                // console.log(data.results)
                setCourses(Object.values(data.results))
            })
            .catch(err => console.error('Fetch error:', err));

    }, []);

    console.log(courses);

    // const filteredCourses = courses.filter(course => course.courseName.toLowerCase().includes(courseNameFilter)
    //     && course.numHoles.includes(courseHolesFilter));

    const filteredCourses = courses.filter(course => {
        const matchesName = course.courseName.toLowerCase().includes(courseNameFilter.toLowerCase());
        const matchesHoles = courseHolesFilter === "other"
            ? (course.numHoles !== "9" && course.numHoles !== "18")
            : course.numHoles.includes(courseHolesFilter);
        return matchesName && matchesHoles;
    });


    const resetFilters = () => {
        setCourseNameFilter("");
        setCourseHolesFilter("")
    }

    return (
        <div>
            {/*<p>Search for students below!</p>*/}
            <Form>
                <Form.Label htmlFor="searchName">Course Name</Form.Label>
                <Form.Control
                    id="searchName"
                    value={courseNameFilter}
                    onChange={(e) => {
                        setCourseNameFilter(e.target.value);
                    }}
                />
                {/*<Form.Label htmlFor="searchNumHoles">Number of Holes</Form.Label>*/}
                {/*<Form.Control*/}
                {/*    id="searchNumHoles"*/}
                {/*    value={courseHolesFilter}*/}
                {/*    onChange={(e) => {*/}
                {/*        setCourseHolesFilter(e.target.value);*/}
                {/*    }}*/}
                {/*/>*/}
                <Form.Label>Number of Holes</Form.Label>
                <div style={{marginBottom: "1rem", textAlign: "center"}}>
                    <Button
                        variant={courseHolesFilter === "9" ? "success" : "outline-success"}
                        onClick={() => setCourseHolesFilter("9")}
                        style={{ margin: "0.25rem" }}
                    >
                        9
                    </Button>
                    <Button
                        variant={courseHolesFilter === "18" ? "success" : "outline-success"}
                        onClick={() => setCourseHolesFilter("18")}
                        style={{ margin: "0.25rem" }}
                    >
                        18
                    </Button>
                    <Button
                        variant={courseHolesFilter === "other" ? "success" : "outline-success"}
                        onClick={() => setCourseHolesFilter("other")}
                        style={{ margin: "0.25rem" }}
                    >
                        Other
                    </Button>
                    <Button variant="outline-danger" onClick={resetFilters}>
                        Reset Search
                    </Button>
                </div>
            </Form>
            <Container fluid>
                <Row className="gx-4 gy-4">
                    <p>There are {filteredCourses.length} courses matching your search.</p>
                    {
                        courses.length > 0 ? filteredCourses.map(course => (
                            <Col xs={12} sm={12} md={6} lg={4} xl={3} key={course.courseName}>
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