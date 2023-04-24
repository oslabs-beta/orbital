import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import LandingPageHero from "../components/LandingPageHero";



const LandingPage = () => {
  
return (<Box>
    <Navbar />
    <LandingPageHero />
</Box>)
}

export default LandingPage;
