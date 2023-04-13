import React, { useEffect } from "react";
import HomePageSideBar from "../components/HomePageSideBar";
import { useNavigate } from "react-router-dom";
import CpuMetrics from "../components/CpuMetrics.jsx";
const Home = () => {
	const nav = useNavigate();
	useEffect(() => {
		if (localStorage.getItem('loggedIn') !== 'true') {
			nav('/login')
		}
	}, [])
	useEffect(() => {
		
	}, [])
    return (
        <div>
            <HomePageSideBar />
						<CpuMetrics />
        </div>
    );
};

export default Home;
