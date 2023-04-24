import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import LandingPageHero from "../components/LandingPageHero";
import LandingPageDemo from "../components/LandingPageDemo";
import LandingPageTechStack from '../components/LandingPageTechStack'

const LandingPage = () => {
  
return (<Box>
    <Navbar />
    <LandingPageHero />
    <LandingPageDemo />
    <LandingPageTechStack />
</Box>)
}

export default LandingPage;
