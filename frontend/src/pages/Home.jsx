import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import AvailUsers from './AvailUsers';
import ChatComponent from '../components/ChatComponent';
import ChatBox from './ChatBox';


const Home = () => {

  return (
    <Container sx={{marginBottom: 5}} >
      <Box sx={{marginBottom: 4, paddingLeft: 2,}}>
        <AvailUsers/>
      </Box>

      <Box sx={{display: "flex", justifyContent: "center"}}>
        <Grid container gap={6}>

          <Grid item xs={4} >
            <ChatComponent/>
          </Grid>

          <Grid item xs={7} sx={{backgroundColor: 'gray'}}>
            <Box >
              <ChatBox/>
            </Box>
          </Grid>
          
        </Grid>
      </Box>
    </Container>
  )
}
export default Home