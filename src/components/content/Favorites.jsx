import {useEffect, useState} from "react";
import Course from "./Course";

export default function Favorites()
{
    const [favorites, setFavorites] = useState([]);

    useEffect(() =>
    {
        const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(stored);
    }, []);

    // Function to handle removal of a favorite and update the list immediately
    const handleFavoriteChange = (courseName) =>
    {
        const updated = favorites.filter(fav => fav.courseName !== courseName);
        localStorage.setItem("favorites", JSON.stringify(updated));
        setFavorites(updated);
    };

    if (favorites.length === 0)
    {
        return <p>No favorite courses saved.</p>;
    }

    return (
        <div>
            <h1>Your Favorite Courses</h1>
            <div style={{display: "flex", flexWrap: "wrap", gap: "1rem"}}>
                {favorites.map(course => (
                    <Course
                        key={course.courseName}
                        {...course}
                        // React to a removal triggered in Course.jsx
                        onFavoriteChange={handleFavoriteChange}
                    />
                ))}
            </div>
        </div>
    );
}
