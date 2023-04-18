//
import { Routes, Route } from "react-router-dom";
import Login from "./client/pages/Login";
import Signup from "./client/pages/Signup";
import Home from "./client/pages/Home";
import { useState } from "react";
function App() {
	const [user, setUser] = useState({});
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home user={user} setUser={setUser} />} />
                <Route path="/signup" element={<Signup setUser={setUser} />} />
                <Route path="/login" element={<Login setUser={setUser} user={user} />} />
            </Routes>
        </div>
    );
}

export default App;
