import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
const ClusterDynamicDetails = ({ currentTab }) => {
    const [metrics, setMetrics] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [clusterName, setClusterName] = useState("");
    useEffect(() => {
        const id = setInterval(() => {
            axios
                .post("http://localhost:3001/jmx/metrics", {
                    broker: "localhost:9090",
                })
                .then((res) => {
                    setMetrics(res.data);
                    console.log(res.data);
                });
        }, 1500);
        setIntervalId(id);
        return () => clearInterval(id);
    }, [clusterName]);
    switch (currentTab) {
        case "overview":
            return (
                <img
                    style={{ height: "300px" }}
                    src="https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg"
                    alt=""
                />
            );
        case "health":
            return (
                <img
                    style={{ height: "300px" }}
                    src="https://cdn.pixabay.com/photo/2016/02/19/15/46/labrador-retriever-1210559__480.jpg"
                    alt=""
                />
            );
    }
};

export default ClusterDynamicDetails;
