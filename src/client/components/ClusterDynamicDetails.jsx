import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ClusterOverview from './ClusterOverview';
import DynamicOverview from './DynamicOverview';
import DynamicHealth from './DynamicHealth';
import DynamicTopics from './DynamicTopics';
import { useParams } from 'react-router-dom';

const ClusterDynamicDetails = ({ currentTab }) => {
  const [metrics, setMetrics] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [clusterName, setClusterName] = useState('');
  const [cluster, setCluster] = useState({});
  const params = useParams();
  useEffect(() => {
    axios.get(`/cluster/clusterById/${params.id}`).then((res) => {
      setCluster(res.data);
      console.log(res.data);
    });
  }, [clusterName]);

  switch (currentTab) {
    case 'overview':
      return (
        <DynamicOverview
          cluster={cluster}
          setIntervalId={setIntervalId}
          intervalId={intervalId}
        />
      );
    /* 
            cluster,
            setUpdatingCluster,
            clusterId,
            setCluster,
            setIntervalId,
            */
    case 'health':
      return (
        <DynamicHealth
          cluster={cluster}
          setIntervalId={setIntervalId}
          intervalId={intervalId}
        />
      );

    case 'topic':
      return (
        <DynamicTopics
          cluster={cluster}
          setIntervalId={setIntervalId}
          intervalId={intervalId}
        />
      );
    default:
      return <div>default</div>;
  }
};

export default ClusterDynamicDetails;
