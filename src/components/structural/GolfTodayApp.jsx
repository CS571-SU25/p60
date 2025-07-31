import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router';

import GolfTodayLayout from './GolfTodayLayout.jsx';
import GolfTodayHome from '../content/GolfTodayHome.jsx';
import CourseBoard from '../content/CourseBoard.jsx';
import CourseDetails from '../content/CourseDetails.jsx';
import NoMatch from '../content/NoMatch.jsx';
import AuthPage from '../content/AuthPage.jsx';
import Favorites from "../content/Favorites.jsx";
import Profile from "../content/Profile.jsx";
import Stats from "../content/Stats.jsx";
import ContactUs from "../content/ContactUs.jsx";

function GolfTodayApp()
{
    const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("loggedInUser"));

    if (!loggedInUser)
    {
        return <AuthPage onLogin={setLoggedInUser}/>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<GolfTodayLayout/>}>
                    <Route index element={<GolfTodayHome/>}/>
                    <Route path="courses" element={<CourseBoard/>}/>
                    <Route path="course-details" element={<CourseDetails/>}/>
                    <Route path="*" element={<NoMatch/>}/>
                    <Route path="favorites" element={<Favorites/>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="stats" element={<Stats/>}/>
                    <Route path="contact" element={<ContactUs />} />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default GolfTodayApp;
