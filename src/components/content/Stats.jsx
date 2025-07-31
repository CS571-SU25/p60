import {useEffect, useState} from "react";

export default function Stats()
{
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [topFavorites, setTopFavorites] = useState([]);

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            try
            {
                const resp = await fetch(
                    "https://cs571api.cs.wisc.edu/rest/su25/bucket/golfcourses",
                    {
                        headers: {
                            "X-CS571-ID": CS571?.getBadgerId?.() || ""
                        }
                    }
                );

                if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

                const data = await resp.json();
                if (!data || !data.results) throw new Error("No data returned");

                const courseList = Object.values(data.results);
                setCourses(courseList);

                // Aggregate favorites from ALL users
                const freq = {};
                for (let i = 0; i < localStorage.length; i++)
                {
                    const key = localStorage.key(i);
                    if (key && key.startsWith("favorites_"))
                    {
                        const favs = JSON.parse(localStorage.getItem(key) || "[]");
                        favs.forEach(f =>
                        {
                            freq[f.courseName] = (freq[f.courseName] || 0) + 1;
                        });
                    }
                }

                const sorted = Object.entries(freq)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 3);

                setTopFavorites(sorted);
            } catch (err)
            {
                console.error("Failed to fetch courses:", err);
                setError(err.message);
            } finally
            {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading stats...</p>;
    if (error) return <p>Error loading stats: {error}</p>;

    const totalCourses = courses.length;
    const nineHole = courses.filter(c => c.numHoles === "9").length;
    const eighteenHole = courses.filter(c => c.numHoles === "18").length;
    const other = totalCourses - nineHole - eighteenHole;

    return (
        <div style={{padding: "2rem"}}>
            <h1>Golf Course Statistics</h1>
            <p>Total Courses: <strong>{totalCourses}</strong></p>
            <p>9-Hole Courses: <strong>{nineHole}</strong></p>
            <p>18-Hole Courses: <strong>{eighteenHole}</strong></p>
            <p>Other: <strong>{other}</strong></p>

            <h2 style={{marginTop: "2rem"}}>Top 3 Most Favorited Courses (All Users)</h2>
            {topFavorites.length === 0 ? (
                <p>No favorites have been saved yet.</p>
            ) : (
                <ol>
                    {topFavorites.map(([name, count]) => (
                        <li key={name}>
                            {name} – {count} favorite{count > 1 ? "s" : ""}
                        </li>
                    ))}
                </ol>
            )}
        </div>
    );
}
