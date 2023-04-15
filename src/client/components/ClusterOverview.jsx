import axios from "axios";
import { useEffect } from "react";
import CpuMetrics from "./CpuMetrics";

const ClusterOverview = ({cluster}) => {

	useEffect(() => {
		
		const id = setInterval(() => {
			// axios.post('http://localhost:3001/metrics', {broker: cluster.prometheusUrl}).then(res => console.log(res.data))
		}, 1000);
		return () => clearInterval(id);
	})

	return (
		<><div style={{ margin: 'auto' }}>{JSON.stringify(cluster)}</div><CpuMetrics /></>
	);
};


export default ClusterOverview;