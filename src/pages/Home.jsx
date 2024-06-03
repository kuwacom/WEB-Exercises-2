import PropTypes from 'prop-types';
import { Box, Button, Typography } from "@mui/material";
import { MoreHorizOutlined, PlaylistAddCheckOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const GridBox = ({ children, title, onClick }) => (
  <Button onClick={onClick}>
    <Box sx={{
      display: 'block',
      color: 'black',
      textAlign: 'center',
      width: 200,
      height: 200,
      borderRadius: 2,
      boxShadow: '0px 0 15px 0 rgba(0, 0, 0, 0.2)',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: '0.3s',
      ":hover": {
        boxShadow: '0px 0 15px 0 rgba(0, 0, 0, 0.6)',
      }
    }}>
      <Typography fontSize={40} fontWeight={800}>{title}</Typography>
      {children}
    </Box>
  </Button>
)
GridBox.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  onClick: PropTypes.func
}

function Home() {
  const navigate = useNavigate();
  return (
    <Box sx={{
      mt: 2,
      mx: 1,
    }}>
      <Typography variant='h4'>My Apps List</Typography>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '10px',
      }}>
        <GridBox title='ToDo' onClick={()=>{navigate('/todo')}}>
          <PlaylistAddCheckOutlined sx={{fontSize: 120}} />
        </GridBox>
        <GridBox title='etc'>
          <MoreHorizOutlined sx={{fontSize: 120}} />
        </GridBox>
      </Box>
    </Box>
  )
}

export default Home;