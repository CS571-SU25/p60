import { useState } from 'react'
import './App.css'
import { HashRouter, Route, Routes } from "react-router"
import Contact from "./components/Contact.jsx"
import Footer from "./components/stylingComponents/Footer.jsx";
import CourseBoard from "./components/CourseBoard.jsx";
import Course from "./components/Course.jsx";
import GolfTodayNavbar from "./components/stylingComponents/Navbar.jsx";
import { BrowserRouter } from "react-router";
import AboutUs from "./components/AboutUs.jsx";

function App() {
    return (
        // <HashRouter>
        //     <Routes>
        //         <Route path="/about-us" element={<AboutUs />} />
        //         <Route path="/other-info" element={<Contact />} />
        //     </Routes>
        // </HashRouter>

        <BrowserRouter>
            <GolfTodayNavbar />
            <Routes>
                <Route path="/p60" element={<CourseBoard />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<CourseBoard />} /> {/* fallback */}
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
