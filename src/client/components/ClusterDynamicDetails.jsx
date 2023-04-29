import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DynamicOverview from './DynamicOverview';
import DynamicHealth from './DynamicHealth';
import { useParams } from 'react-router-dom';

const ClusterDynamicDetails = ({ currentTab }) => {
  const [intervalId, setIntervalId] = useState(null);
  const [clusterName, setClusterName] = useState('');
  const [cluster, setCluster] = useState({});
  const params = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/cluster/clusterById/${params.id}`)
      .then((res) => {
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
        <div>
          <img
            src='https://paradepets.com/.image/t_share/MTkxMzY1Nzg4Njc2NzI4NDE4/golden-retriever.jpg'
            alt=''
          />
        </div>
      );
    default: 
        return (
          <div>default</div>
        )

  }
};

export default ClusterDynamicDetails;
