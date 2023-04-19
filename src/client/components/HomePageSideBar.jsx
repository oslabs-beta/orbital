import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Modal } from "@mui/material";
import { useState } from "react";
import { Button } from "@mui/material";
import { Paper } from "@mui/material";
import { Card, CardContent, TextField } from "@mui/material";
import axios from "axios";
import ClusterOverview from "./ClusterOverview";

const drawerWidth = 240;

const styles = {
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",

        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
    },
    card: {
        backgroundColor: "white",

        borderRadius: "8px",
        width: "100%",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        padding: "16px",
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
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    })
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft({user}) {
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [clusterName, setClusterName] = useState("");
    const [brokers, setBrokers] = useState("");
    const [currentCluster, setCurrentCluster] = useState(null);
    // const [brokersArr, setBrokersArr] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0)

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleClose = () => {
        setShowModal(false);
    };
    const handleOpen = () => {
        setShowModal(true);
    };

    const handleCreateCluster = async () => {
        const brokersArr = brokers.split(", ");
        const newCluster = { name: clusterName, brokers: brokersArr };
				await axios.post(
					'http://localhost:3001/cluster', {
						cluster_name: clusterName, 
						prom_port: brokers, 
						owner: user._id
					}
				);
        setShowModal(false);
        window.location.reload();
        console.log('user: ', user)
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: "none" }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Persistent drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleOpen}>
                            <ListItemText primary="Add New Cluster" />
                        </ListItemButton>
                    </ListItem>
                </List>
                <List>
    {user?.clusters?.map((cluster, index) => {
        const icon = <InboxIcon />;
        return (
            <ListItem key={cluster._id} disablePadding>
                <ListItemButton onClick={() => {
                    setCurrentCluster(cluster)
                    setCurrentIndex(index);
                }
                    }>
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={cluster.name} />
                </ListItemButton>
            </ListItem>
        )
    })}
</List>

                <Divider />
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Box
                    sx={{
                        width: "500px",
                        border: "1px solid white",
                    }}
                >
                    {showModal && (
                        <Modal
                            open={true}
                            onClose={handleClose}
                            aria-labelledby="parent-modal-title"
                            aria-describedby="parent-modal-description"
                            sx={{
                                width: 500,
                                height: 500,

                                margin: "auto",
                            }}
                        >
                            <Card sx={styles.card}>
                                <CardContent>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            mb: "16px",
                                            textAlign: "center",
                                        }}
                                    >
                                        Create Cluster
                                    </Typography>
                                    <TextField
                                        sx={styles.input}
                                        label="Cluster Name"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        onChange={(e) =>
                                            setClusterName(e.target.value)
                                        }
                                    />
                                    <TextField
                                        sx={styles.input}
                                        label="Enter Brokers"
                                        variant="outlined"
                                        size="large"
                                        multiline
                                        rows={5}
                                        fullWidth
                                        onChange={(e) =>
                                            setBrokers(e.target.value)
                                        }
                                    />
                                    <Button
                                        sx={styles.submitButton}xxx
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        onClick={handleCreateCluster}
                                    >
                                        Create
                                    </Button>
                                </CardContent>
                            </Card>
                        </Modal>
                    )}
                </Box>
            <ClusterOverview cluster={currentCluster} index={currentIndex}/>
            </Main>
        </Box>
    );
}
