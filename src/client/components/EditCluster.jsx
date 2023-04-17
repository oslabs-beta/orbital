import React from 'react';
import { useEffect, useState } from 'react';
import { Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import {Popper, Button, Box} from '@mui/material';


const EditCluster = ({anchorEl}) => {
	const [showPopper, setShowPopper] = useState(false);

	return (
		<>
		<Button onClick={() => setShowPopper(true)}>...</Button>
      <Popper open={showPopper} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
        The content of the Popper.
        </Box>
      </Popper>
		</>
	)
};

export default EditCluster;