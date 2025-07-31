import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Card, Image} from "react-bootstrap";

const Course = (props) =>
{
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() =>
    {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        setIsFavorite(favorites.some(fav => fav.courseName === props.courseName));
    }, [props.courseName]);

    const handleViewDetails = () =>
    {
        navigate("/course-details", {state: {course: props}});
    };

    const toggleFavorite = () =>
    {
        let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

        if (isFavorite)
        {
            favorites = favorites.filter(fav => fav.courseName !== props.courseName);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            setIsFavorite(false);

            // Notify parent if available
            if (props.onFavoriteChange)
            {
                props.onFavoriteChange(props.courseName);
            }
        }
        else
        {
            favorites.push(props);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            setIsFavorite(true);
        }
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
                    </Button>{" "}
                    <Button
                        variant={isFavorite ? "danger" : "outline-primary"}
                        onClick={toggleFavorite}
                    >
                        {isFavorite ? "Remove from Favorites" : "Save to Favorites"}
                    </Button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </Card>
    );
};

export default Course;
