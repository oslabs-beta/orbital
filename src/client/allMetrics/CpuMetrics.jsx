import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, CardHeader } from "@mui/material";

// Creates a chart instance for CPU metrics displaying a percentage for CPU usage
const CpuMetrics = ({ cpuMetrics }) => {
    const cpuMetric = cpuMetrics * 100;

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
        scales: {
            y: {
                max: 100,
                ticks: {
                    stepSize: 10,
                    beginAtZero: true,
                },
                title: {
                    display: true,
                    text: "Percentage",
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };

    const data = {
        labels: [""],
        datasets: [
            {
                label: "Current CPU",
                data: [cpuMetric],
                backgroundColor: "rgba(150, 149, 255, 0.5)",
            },
        ],
    };

    return (
        <Card sx={{ width: 500, mb: 2, boxShadow: "0px 0px 4px black" }}>
            <CardHeader title="CPU Usage" style={{ textAlign: "center" }} />
            <Bar
                options={options}
                data={data}
                style={{ margin: "auto", height: "auto", width: 500 }}
            />
        </Card>
    );
};

export default CpuMetrics;