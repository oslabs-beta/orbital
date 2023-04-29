import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
	const nav = useNavigate();

	const handleLogout = () => {
		localStorage.clear();
		nav('/login');
	}

	return (
		<Button
          sx={{mt: 5, }}
          variant='contained'
					color="secondary"
          onClick={handleLogout}
					
					fullWidth
        >
          Logout
        </Button>
	)
}