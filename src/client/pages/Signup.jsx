import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
} from "@mui/material";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from '../assets/Login-background.jpg';
import TransparentTextLogo from '../assets/Transparent-Logo.png';

const styles = {
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        // backgroundImage: `url(${signupbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
    },
    card: {
        backgroundColor: "white",
        backdropFilter: "blur(40px) brightness(170%)",
        borderRadius: "8px",
        maxWidth: "500px",
        width: "100%",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        padding: "16px",
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center"
    },
    input: {
        marginBottom: "16px",
    },
    submitButton: {
        marginTop: "16px",
        marginBottom: "8px",
        backgroundColor: "#227BA5",
        color: "#ffffff",
        "&:hover": {
            backgroundColor: "#1D6490",
        },
    },
    signupLink: {
        color: "##227BA5",
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
        },
        cursor: "pointer",
    },
};

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();

    const signUpHandler = () => {
        if (!email || !password || !firstName || !lastName) {
            return;
        } else if (password !== confirmPass) {
            return;
        }
        axios
            .post("http://localhost:3001/user/signup", { email, password })
            .then((response) => {
                localStorage.setItem("userId", response.data._id);
                localStorage.setItem("isLoggedIn", "true");
                navigate("/");
            })
            .catch((e) => console.log("oopsie"));
    };
    return (
        <Box  sx={{
            backgroundImage: `url(${Background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            minHeight: '100vh',
            display: "flex",
          }}>
            <Card sx={styles.card}>
          
                <CardContent sx={{ mb: "75px" }}>
                    <Typography 
                        onClick={() => navigate('/')}
                        sx={{ mb: "1px", textAlign: "center", fontSize:"50px", cursor:"pointer" }}>
                        <img src={TransparentTextLogo} alt="Orbital logo" height="325px" width="325px"/> 
                    </Typography> 
                <Typography
                        variant="h5"
                        sx={{
                            mb: "16px",
                            textAlign: "center",
                            color: "black",
                        }}
                    >
                        Sign Up
                    </Typography>
                    <TextField
                        sx={styles.input}
                        label="First Name"
                        variant="outlined"
                        size="small"
                        type="text"
                        fullWidth
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        sx={styles.input}
                        label="Last Name"
                        variant="outlined"
                        size="small"
                        type="text"
                        fullWidth
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        sx={styles.input}
                        label="Email"
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        sx={styles.input}
                        label="Password"
                        variant="outlined"
                        size="small"
                        type="password"
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        sx={styles.input}
                        label="Confirm Password"
                        variant="outlined"
                        size="small"
                        type="password"
                        fullWidth
                        onChange={(e) => setConfirmPass(e.target.value)}
                    />
                    <Button
                        color="secondary"
                    
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={signUpHandler}
                    >
                        Sign Up
                    </Button>
                    <Typography
                        variant="body2"
                        sx={{ textAlign: "center", mt: "25px", fontSize:"20px" }}
                    >
                        Already have an account?{" "}
                        <a href="/login" sx={styles.signupLink}>
                            Log In
                        </a>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Signup;
