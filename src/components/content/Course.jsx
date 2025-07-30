import {Button, Card, Image} from "react-bootstrap";

const Course = (props) =>
{
    return <Card style={{
        // margin: "auto",
        // marginTop: "1rem",
        maxWidth: "40rem",
        height: "auto",
        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "space-between"
    }}>
        {
            Object.keys(props).length > 0 ? <>
                <h2
                    style={{
                        fontSize: "0.75rem",
                        textAlign: "center"
                    }}
                >
                    {props.courseName}
                </h2>
                <strong>{props.numHoles}</strong>
                <br></br>
                <Image
                    src={props.imagePath}
                    alt={props.courseName}
                    style={{objectFit: "cover", width: "100%", height: "200px"}}
                    fluid
                /> <br></br>
                <Button variant={"success"} onClick={() => alert("Feature Coming Soon!")}>View Course Details</Button>
            </> : <p>Loading...</p>
        }
    </Card>
}

export default Course;