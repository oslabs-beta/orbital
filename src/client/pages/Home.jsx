import React, { useEffect, useState } from 'react';
import HomePageSideBar from '../components/HomePageSideBar';
import { useNavigate } from 'react-router-dom';
import CpuMetrics from '../allMetrics/CpuMetrics.jsx';
import axios from 'axios';
import ClusterOverview from '../components/ClusterOverview';
const Home = ({ setUser, user }) => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  /*
	{
		email: "email@email.com",
		_id: "12345",
		clusterArr: [{},{},{}]
	}

	{
		"_id":{"$oid":"643ab88e519fc34190e1cf5f"},
		"email":"sid",
		"clusters":[],
		"__v":{"$numberInt":"0"}
	}
	*/
  const nav = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      nav('/login');
    }
  }, []);

  // useEffect(() => {
  // 	const data = {
  // 		userId: userId
  // 	}
  // 	const url = '3001/users/getUserInfo'
  // 	axios.post(url, {data}).then(response => setUser(response.data)).catch(e => console.log(e))

  // }, [user])

  return (
    <div style={{ backgroundColor: 'black' }}>
      <HomePageSideBar user={user} />
    </div>
  );
};

export default Home;
