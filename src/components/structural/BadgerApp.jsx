import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router';

import BadgerLayout from './BadgerLayout';
import BadgerLogin from '../auth/BadgerLogin';
import BadgerRegister from '../auth/BadgerRegister';
import BadgerLogout from '../auth/BadgerLogout';
import GolfTodayHome from '../content/GolfTodayHome.jsx';
import BadgerNoMatch from '../content/BadgerNoMatch';

function BadgerApp()
{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BadgerLayout/>}>
                    <Route index element={<GolfTodayHome/>}/>
                    <Route path="login" element={<BadgerLogin/>}/>
                    <Route path="register" element={<BadgerRegister/>}/>
                    <Route path="logout" element={<BadgerLogout/>}/>
                    <Route path="*" element={<BadgerNoMatch/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default BadgerApp;
