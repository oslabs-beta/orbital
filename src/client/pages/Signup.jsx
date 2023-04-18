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
        backgroundColor: "transparent",
        backdropFilter: "blur(24px) brightness(110%)",
        borderRadius: "8px",
        maxWidth: "400px",
        width: "100%",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        padding: "16px",
    },
    input: {
        marginBottom: "16px",
        backgroundColor: "rgba(255, 255, 255, .7)",
        borderRadius: "4px",
    },
    submitButton: {
        marginTop: "16px",
        marginBottom: "8px",
        backgroundColor: "#7D8B47",
        color: "#ffffff",
        "&:hover": {
            backgroundColor: "#526137",
        },
    },
    signupLink: {
        color: "#white",
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
        <Box sx={styles.root}>
            <Card sx={styles.card}>
                <CardContent>
                    <Typography
                        variant="h5"
                        sx={{
                            mb: "16px",
                            textAlign: "center",
                            color: "white",
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
                        sx={styles.submitButton}
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={signUpHandler}
                    >
                        Sign Up
                    </Button>
                    <Typography
                        variant="body2"
                        sx={{
                            textAlign: "center",
                            mt: "16px",
                            color: "white",
                        }}
                    >
                        Already have an account?{" "}
                        <a href="/login" sx={styles.signupLink}>
                            Log in
                        </a>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Signup;
