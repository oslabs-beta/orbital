//
import { Routes, Route } from "react-router-dom";
import Login from "./client/pages/Login";
import Signup from "./client/pages/Signup";
import Home from "./client/pages/Home";
import LandingPage from "./client/pages/LandingPage";
import Documentation from "./client/pages/Documentation";
import ClusterDetail from "./client/pages/ClusterDetail";
import { useState } from "react";

function App() {
    const [user, setUser] = useState({});
    return (
        <div className="App">
            <Routes>
                <Route
                    path="/home"
                    element={<Home user={user} setUser={setUser} />}
                />
                <Route path="/signup" element={<Signup setUser={setUser} />} />
                <Route
                    path="/login"
                    element={<Login setUser={setUser} user={user} />}
                />
                <Route path="/" element={<LandingPage />} />
                <Route path="/docs" element={<Documentation />} />
                <Route path="/cluster/:id" element={<ClusterDetail />} />
            </Routes>
        </div>
    );
}

export default App;
