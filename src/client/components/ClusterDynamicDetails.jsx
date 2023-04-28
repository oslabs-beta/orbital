import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ClusterOverview from "./ClusterOverview";
import DynamicOverview from "./DynamicOverview";
import DynamicHealth from "./DynamicHealth";
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
            return <DynamicOverview />;
        /* 
            cluster,
            setUpdatingCluster,
            clusterId,
            setCluster,
            setIntervalId,
            */
        case "health":
            return <DynamicHealth />;

        case "broker":
            return (
                <div>
                    <img
                        src="https://media-be.chewy.com/wp-content/uploads/2022/09/27110948/cute-dogs-hero-1024x615.jpg"
                        alt=""
                    />
                </div>
            );

        case "topic":
            return (
                <div>
                    <img
                        src="https://paradepets.com/.image/t_share/MTkxMzY1Nzg4Njc2NzI4NDE4/golden-retriever.jpg"
                        alt=""
                    />
                </div>
            );
    }
};

export default ClusterDynamicDetails;
