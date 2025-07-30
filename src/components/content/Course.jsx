import {useNavigate} from "react-router-dom";
import {Button, Card, Image} from "react-bootstrap";

const Course = (props) =>
{
    const navigate = useNavigate();

    const handleViewDetails = () =>
    {
        navigate("/course-details", {state: {course: props}});
    };

    return (
        <Card style={{maxWidth: "40rem", height: "auto"}}>
            {Object.keys(props).length > 0 ? (
                <>
                    <h2 style={{fontSize: "0.75rem", textAlign: "center"}}>
                        {props.courseName}
                    </h2>
                    <strong>{props.numHoles}</strong>
                    <br/>
                    <Image
                        src={props.imagePath}
                        alt={props.courseName}
                        style={{objectFit: "cover", width: "100%", height: "200px"}}
                        fluid
                    />
                    <br/>
                    <Button variant="success" onClick={handleViewDetails}>
                        View Course Details
                    </Button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </Card>
    );
};

export default Course;
