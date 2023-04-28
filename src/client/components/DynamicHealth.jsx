import { Box, Paper, Card, Typography } from "@mui/material";

const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    gap: "10px",
    margin: "auto",
    height: "100%",
};

const chartsContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: "16px",
    width: "80%",
    height: "auto",
    margin: "auto",
    marginTop: "50px",
};

const chartStyle = {
    width: "40%",
    height: "300px",
    marginBottom: "16px",
};

const metricsBoxStyle = {
    flex: 1,
    padding: "5px",
    width: "80%",
    margin: "auto",
};

const HealthMetrics = () => {
    return (
        <Box style={containerStyle}>
            <Box style={chartsContainerStyle}>
                <Box style={chartStyle}>Chart 1</Box>
                <Box style={chartStyle}>Chart 2</Box>
                <Box style={chartStyle}>Chart 3</Box>
                <Box style={chartStyle}>Chart 4</Box>
            </Box>
            <Box style={metricsBoxStyle}>
                <Paper
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        boxShadow: `3px 3px 3px rgba(0, 0, 0, 0.5)`,
                    }}
                >
                    <Card sx={{ border: "none", boxShadow: "none" }}>
                        <Typography variant="h5">Metric 1</Typography>
                        <Typography variant="h5" sx={{ textAlign: "center" }}>
                            Value 1
                        </Typography>
                    </Card>
                    <Card sx={{ border: "none", boxShadow: "none" }}>
                        <Typography variant="h5">Metric 2</Typography>
                        <Typography variant="h5" sx={{ textAlign: "center" }}>
                            Value 2
                        </Typography>
                    </Card>
                    <Card sx={{ border: "none", boxShadow: "none" }}>
                        <Typography variant="h5">Metric 3</Typography>
                        <Typography variant="h5" sx={{ textAlign: "center" }}>
                            Value 3
                        </Typography>
                    </Card>
                    <Card sx={{ border: "none", boxShadow: "none" }}>
                        <Typography variant="h5">Metric 4</Typography>
                        <Typography variant="h5" sx={{ textAlign: "center" }}>
                            Value 4
                        </Typography>
                    </Card>
                </Paper>
            </Box>
        </Box>
    );
};

export default HealthMetrics;
