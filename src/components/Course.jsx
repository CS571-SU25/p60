import {Button, Card, Image} from "react-bootstrap";

const Course = (props) => {
    return <Card style={{margin: "auto", marginTop: "1rem", maxWidth: "40rem"}}>
        {
            Object.keys(props).length > 0 ? <>
                <h2>{props.results.courseName}</h2>
                <strong>{props.results.numHoles}</strong>
                <Image>{props.results.imagePath}</Image>
                <Button>View Course Details</Button>
            </> : <p>Loading...</p>
        }
    </Card>
}

export default Course;