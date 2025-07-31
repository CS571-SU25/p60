import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router';

import BadgerLayout from './BadgerLayout';
import GolfTodayHome from '../content/GolfTodayHome.jsx';
import CourseBoard from '../content/CourseBoard.jsx';
import CourseDetails from '../content/CourseDetails.jsx';
import BadgerNoMatch from '../content/BadgerNoMatch';
import AuthPage from '../content/AuthPage.jsx';
import Favorites from "../content/Favorites.jsx";

function BadgerApp()
{
    const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("loggedInUser"));

    if (!loggedInUser)
    {
        return <AuthPage onLogin={setLoggedInUser}/>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BadgerLayout/>}>
                    <Route index element={<GolfTodayHome/>}/>
                    <Route path="courses" element={<CourseBoard/>}/>
                    <Route path="course-details" element={<CourseDetails/>}/>
                    <Route path="*" element={<BadgerNoMatch/>}/>
                    <Route path="favorites" element={<Favorites />} />


                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default BadgerApp;
