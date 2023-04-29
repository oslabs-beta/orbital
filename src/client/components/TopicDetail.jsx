import React from "react";
import { useEffect, useState } from "react";
import { Typography, Box, Divider } from "@mui/material";
import axios from "axios";
const TopicDetail = ({ topic }) => {
    const [topicMetric, setTopicMetric] = useState({
        resultType: "vector",
        result: [
            {
                metric: {
                    __name__: "kafka_topic_partition_current_offset",
                    instance: "localhost:9308",
                    job: "kafka",
                    partition: "0",
                    topic: "sales",
                },
                value: [1682792155.791, "0"],
            },
            {
                metric: {
                    __name__: "kafka_topic_partition_current_offset",
                    instance: "localhost:9308",
                    job: "kafka",
                    partition: "1",
                    topic: "sales",
                },
                value: [1682792155.791, "24337"],
            },
            {
                metric: {
                    __name__: "kafka_topic_partition_current_offset",
                    instance: "localhost:9308",
                    job: "kafka",
                    partition: "2",
                    topic: "sales",
                },
                value: [1682792155.791, "19150"],
            },
            {
                metric: {
                    __name__: "kafka_topic_partition_current_offset",
                    instance: "localhost:9308",
                    job: "kafka",
                    partition: "3",
                    topic: "sales",
                },
                value: [1682792155.791, "12039"],
            },
            {
                metric: {
                    __name__: "kafka_topic_partition_current_offset",
                    instance: "localhost:9308",
                    job: "kafka",
                    partition: "4",
                    topic: "sales",
                },
                value: [1682792155.791, "9702"],
            },
        ],
    });
    return (
        <Box sx={{}}>
            {topicMetric?.result.map((metric) => {
                return (
                    <Box sx={{ textAlign: "left" }}>
                        <Divider />
                        <Typography>
                            <b>Partition:</b> {`${metric?.metric.partition}`}
                        </Typography>
                        <Typography>
                            <b>Value:</b> {`${metric?.value[0]}`}
                        </Typography>
                        <Typography>
                            <b>Offset:</b> {`${metric?.value[1]}`}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );
};

export default TopicDetail;
