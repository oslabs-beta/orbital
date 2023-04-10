//
import { Routes, Route } from "react-router-dom";
import Login from "./client/pages/Login";
import Signup from "./client/pages/Signup";
import Home from "./client/pages/Home";
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
