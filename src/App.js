//
import { Routes, Route } from "react-router-dom";
import Login from "./client/pages/Login";
import Signup from "./client/pages/Signup";
import Home from "./client/pages/Home";
import LandingPage from "./client/pages/LandingPage";
import { useState } from "react";
function App() {
	const [user, setUser] = useState({});
    return (
        <div className="App">
            <Routes>
                <Route path="/home" element={<Home user={user} setUser={setUser} />} />
                <Route path="/signup" element={<Signup setUser={setUser} />} />
                <Route path="/login" element={<Login setUser={setUser} user={user} />} />
                <Route path="/" element={<LandingPage />} />
            </Routes>
        </div>
    );
}

export default App;
