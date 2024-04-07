import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';



const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  function handleSubmit(event) {
    event.preventDefault();
  }

  const registerUser = async () => {
    //handle errors
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');

    // reset errors
    emailError.textContent = '';
    passwordError.textContent = '';


    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({name, email, password}),
        credentials: 'include'
      });

      
      
      const Data = await response.json();
      if (Data.errors) {
        emailError.textContent = Data.errors.email;
        passwordError.textContent = Data.errors.password;
      }
      // console.log('Response:', Data);
      else window.location.href = Data.redirect;

    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <Container maxWidth="sm">

      <Box sx={{display: "flex", justifyContent: "center", marginBottom: 3, color: 'gray'}}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
      </Box>
      
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} direction="column" sx={{marginBottom: 4}}>
          <TextField
              variant='outlined'
              color='secondary'
              label="Name"
              onChange={e => setName(e.target.value)}
              value={name}
              required
              sx={{mb: 4}}
          />
          <div className="error"></div>

          <TextField
              type="email"
              variant='outlined'
              color='secondary'
              label="Email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              required
              sx={{mb: 4}}
          />
          <div className="email error"></div>

          <TextField
              type="password"
              variant='outlined'
              color='secondary'
              label="Password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              required
              sx={{mb: 4}}
          />
          <div className="password error"></div>

          <Button variant="outlined" color="secondary" onClick={registerUser}>Register</Button>
        </Stack>
      </form>
    </Container>
  )
}
export default Register