import {useState, useEffect} from "react";

export default function CourseBoard()
{
    useEffect(() =>
    {
        fetch('https://cs571api.cs.wisc.edu/rest/su25/bucket/golfcourses', {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
            .then(res =>
            {
                if (!res.ok)
                {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => console.log(data))
            .catch(err => console.error('Fetch error:', err));

    }, []);
}