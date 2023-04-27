import { Box } from "@mui/material";
import Chart from "chart.js";
import CpuMetrics from "./CpuMetrics";
import RamMetrics from "./RamMetrics";
import NetworkMetrics from "./NetworkMetrics";
import BytesMetrics from "./BytesMetrics";

const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    gap: "10px",
    margin: "auto",
    height: "100%",
    border: "1px solid red",
};

const chartsContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: "16px",
    border: "1px solid red",
    width: "80%",
    height: "80%",
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
    border: "1px solid red",
    padding: "16px",
    width: "80%",
};

const DynamicOverview = () => {
    return (
        <Box style={containerStyle}>
            <Box style={chartsContainerStyle}>
                <Box style={chartStyle}>
                    <BytesMetrics />
                </Box>
                <Box style={chartStyle}>
                    <RamMetrics />
                </Box>
                <Box style={chartStyle}>
                    <NetworkMetrics />
                </Box>
                <Box style={chartStyle}>
                    <CpuMetrics />
                </Box>
            </Box>
            <Box style={metricsBoxStyle}>5</Box>
        </Box>
    );
};

export default DynamicOverview;
