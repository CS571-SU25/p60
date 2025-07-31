import {useEffect, useState} from "react";
import Course from "./Course";

export default function Favorites()
{
    const [favorites, setFavorites] = useState([]);
    const loggedInUser = localStorage.getItem("loggedInUser");
    const favoritesKey = `favorites_${loggedInUser}`;

    useEffect(() =>
    {
        const stored = JSON.parse(localStorage.getItem(favoritesKey) || "[]");
        setFavorites(stored);
    }, [favoritesKey]);

    const handleFavoriteChange = (courseName) =>
    {
        const updated = favorites.filter(fav => fav.courseName !== courseName);
        localStorage.setItem(favoritesKey, JSON.stringify(updated));
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
                        onFavoriteChange={handleFavoriteChange}
                    />
                ))}
            </div>
        </div>
    );
}
