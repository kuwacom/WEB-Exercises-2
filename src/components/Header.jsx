import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
    <Box sx={{display: 'flex'}}>
      <AppBar component="nav" sx={{m:0, p:0}}>
        <Toolbar>
          <Typography
            variant='h4'
            fontWeight={600}
            sx={{ flexGrow: 1 }}
          >
            My App
          </Typography>
          <Box sx={{ display: 'block' }}>
            <Link to="/" style={{color: 'white'}}>Home</Link>
            {' '}
            <Link to="/todo" style={{color: 'white'}}>ToDo</Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
    </>
  )
}

export default Header;