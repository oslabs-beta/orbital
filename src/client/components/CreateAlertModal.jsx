import { AlignHorizontalRight } from "@mui/icons-material";
import {Box, List, ListItem, ListItemButton, ListItemText, FormControl, InputLabel, MenuItem, Select, Typography, TextField, Button, Card, CardContent, Modal, } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function MyAlerts({setShowMyAlerts}) {



const alertNames = {
		latency: 'Latency (ms)',
		cpumetric: 'CPU Usage',
		bytesintotalmetric: 'Total Bytes In',
		bytesOutmetric: 'Total Bytes Out',
		ramUsageMetric: 'Ram Usage (MB)',
		producerRequestsTotal: 'Total Producer Requests',
		producersMessagesInTotal: 'Total Producer Messages',
		producerConversionsTotal: 'Total Producer Conversions',
		consumerRequestsTotal: 'Total Consumer Requests',
		consumerConversionsTotal: 'Total Consumer Requests',
		consumerFailedRequestsTotal: 'Total Failed Consumer Requests'
	}
	const [alerts, setAlerts] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:3001/alerts/' + localStorage.getItem('userId'))
			.then(res => {
				console.log({alerts})
				setAlerts(res.data)
			})
			.catch(e => console.log(e));
	}, [alerts])

	const styles = {
		card: {
			backgroundColor: 'white',
			borderRadius: '8px',
			width: '100%',
			boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
			padding: '16px',
		},
	}

	const deleteAlert = (id) => {
		axios.delete('http://localhost:3001/alerts/' + id);
	}

  return (
	  <Modal
			open={true}
			sx={{
				width: 500,
				height: 500,
				margin: 'auto',
			}}
		>
			<Card sx={styles.card}>
				<CardContent>
					<Typography
						variant='h5'
						sx={{
							mb: '16px',
							textAlign: 'center',
						}}
					>
						My Alerts
					</Typography>
						<Button onClick={() => setShowMyAlerts(false)}>Cancel</Button>
						<List>
						{!alerts.length ? <Box>No Alerts Here!</Box> : alerts.map(alert => (
							<ListItem>
							<ListItemText primary={alertNames[alert.metric] + ' Over: ' + alert.over + ' Under: ' + alert.under} sx={{textAlign: 'center', color: 'black'}} />
							<Button onClick={() => deleteAlert(alert._id)} variant="contained" size="xs" sx={{backgroundColor: 'darkred'}}>Delete</Button>
					</ListItem>
						))}      
						</List>
				</CardContent>
			</Card>
		</Modal>
	);
}

export default function CreateAlertModal({setShowModal, showModal}) {

	const styles = {
		card: {
			backgroundColor: 'white',
			borderRadius: '8px',
			width: '100%',
			boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
			padding: '16px',
		},
	}
	const [low, setLow] = useState(-Infinity);
	const [high, setHigh] = useState(Infinity);
	const [metric, setMetric] = useState('latency');
	const [showMyAlerts, setShowMyAlerts] = useState(false);

	const createAlert = async () => {
		const body = {
			under: low,
			over: high,
			id: localStorage.getItem('userId'),
			metric
		};

		const res = await axios.post('http://localhost:3001/alerts', body).catch(e => {
			console.log(e)
		});
	}

  
  return (
		showMyAlerts ? <MyAlerts setShowMyAlerts={setShowMyAlerts} /> :
	  <Modal
			open={showModal}
			aria-labelledby='parent-modal-title'
			aria-describedby='parent-modal-description'
			sx={{
				width: 500,
				height: 500,
				margin: 'auto',
			}}
		>
			<Card sx={styles.card}>
				<CardContent>
				  <Button
						variant='outlined'
						sx={{marginTop: 1}}
						onClick={() => setShowMyAlerts(true)}
					>
						My Alerts
					</Button>
					<Typography
						variant='h5'
						sx={{
							mb: '16px',
							textAlign: 'center',
						}}
					>
						Create Alert
					</Typography>
					<FormControl fullWidth>
						<InputLabel>Metric</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={metric}
							label="Metric"
							onChange={(e) => setMetric(e.target.value)}
							sx={{marginBottom: 5}}
						>
							<MenuItem value={'latency'}>Latency (ms)</MenuItem>
							<MenuItem value={'cpumetric'}>CPU Usage (MB)</MenuItem>
							<MenuItem value={'bytesintotalmetric'}>Bytes In Total</MenuItem>
							<MenuItem value={'bytesOutmetric'}>Bytes Out Total</MenuItem>
							<MenuItem value={'ramUsageMetric'}>Ram Usage (MB)</MenuItem>
							<MenuItem value={'producerRequestsTotal'}>Total Producer Requests</MenuItem>
							<MenuItem value={'producersMessagesInTotal'}>Total Producer Messages</MenuItem>
							<MenuItem value={'producerConversionsTotal'}>Total Producer Conversions</MenuItem>
							<MenuItem value={'consumerRequestsTotal'}>Total Consumer Requests</MenuItem>
							<MenuItem value={'consumerConversionsTotal'}>Total Consumer Conversions</MenuItem>
							<MenuItem value={'consumerFailedRequestsTotal'}>Total Failed Consumer Requests</MenuItem>
						</Select>
					</FormControl>
					<Box sx={{display: 'flex', justifyItems: 'space-between'}}>
					<TextField
						label='Low'
						variant='outlined'
						size='small'
						sx={{marginRight: 1}}
						onChange={(e) => setLow(e.target.value) }
					/>
					<TextField
						sx={styles.input}
						label='High'
						variant='outlined'
						size='small'
						onChange={(e) => setHigh(e.target.value) }
					/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<Button onClick={() => setShowModal(false)}>Cancel</Button>
						<Button
							variant='contained'
							sx={{marginTop: 1}}
							onClick={createAlert}
						>
							Create
						</Button>
					</Box>
				</CardContent>
			</Card>
		</Modal>
	);
}