import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HashRouter, Route, Routes } from "react-router"
import AboutUs from "./components/AboutUs.jsx"
import OtherInfo from "./components/OtherInfo.jsx"

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/other-info" element={<OtherInfo />} />
            </Routes>
        </HashRouter>
    )
}

export default App
