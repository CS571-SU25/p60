import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HashRouter, Route, Routes } from "react-router"
import AboutUs from "./components/AboutUs.jsx"
import OtherInfo from "./components/OtherInfo.jsx"
import Navbar from "./components/stylingComponents/Navbar.jsx";
import Footer from "./components/stylingComponents/Footer.jsx";
import CourseBoard from "./components/CourseBoard.jsx";

function App() {
    return (
        // <HashRouter>
        //     <Routes>
        //         <Route path="/about-us" element={<AboutUs />} />
        //         <Route path="/other-info" element={<OtherInfo />} />
        //     </Routes>
        // </HashRouter>

        <div>
            <Navbar/>
            <CourseBoard/>
            <h2>This is the homepage</h2>
            <Footer/>
        </div>
    )
}

export default App
