import {useLocation} from "react-router-dom";

export default function CourseDetails()
{
    const {state} = useLocation();
    const course = state?.course;

    if (!course)
    {
        return <p>No course selected.</p>;
    }

    return (
        <div>
            <h1>{course.courseName}</h1>
            <p>{course.numHoles} holes</p>
            <p>
                Location: {course.streetNumber} {course.streetName}, {course.cityName}, {course.stateName} {course.zipCode}
            </p>
            <p>Phone: {course.phoneNumber}</p>

            <h3>Available Tee Times</h3>
            <ul>
                {course.availableTeeTimes.map((t, i) => <li key={i}>{t}</li>)}
            </ul>

            <h3>Prices</h3>
            <ul>
                <li>Morning (cart): {course.morningPricePerNineCart}</li>
                <li>Afternoon (cart): {course.afternoonPricePerNineCart}</li>
                <li>Twilight (cart): {course.twilightPricePerNineCart}</li>
                <li>Morning (walk): {course.morningPricePerNineWalk}</li>
                <li>Afternoon (walk): {course.afternoonPricePerNineWalk}</li>
                <li>Twilight (walk): {course.twilightPricePerNineWalk}</li>
            </ul>
        </div>
    );
}
