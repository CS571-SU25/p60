import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router';

import BadgerLayout from './BadgerLayout';
import GolfTodayHome from '../content/GolfTodayHome.jsx';
import CourseBoard from '../content/CourseBoard.jsx';
import CourseDetails from '../content/CourseDetails.jsx'; // NEW
import BadgerNoMatch from '../content/BadgerNoMatch';

function BadgerApp()
{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BadgerLayout/>}>
                    <Route index element={<GolfTodayHome/>}/>
                    <Route path="courses" element={<CourseBoard/>}/>
                    <Route path="course-details" element={<CourseDetails/>}/> {/* NEW */}
                    <Route path="*" element={<BadgerNoMatch/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default BadgerApp;
