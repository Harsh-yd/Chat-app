import { Outlet, NavLink } from "react-router-dom";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useSelector,useDispatch } from 'react-redux';
import { logOutUser } from "../features/userSlice";


const RootLayout = () => {
  const {loggedUser} = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <>
      <header>
          <nav>
          <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
            
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  CHAT APP
                </Typography>

                  <Typography variant="h8" component="div" sx={{ flexGrow: 1 }}>
                    {loggedUser && "Logged in as "+loggedUser.name.toUpperCase()}
                  </Typography>

                  {!loggedUser && 
                  <Button color="inherit">
                    <NavLink to="/login">Login</NavLink>
                  </Button>
                  }
                  
                  {!loggedUser && 
                  <Button color="inherit">
                    <NavLink to="/register" >Register</NavLink>
                  </Button>
                  }
                
                  {loggedUser &&
                  <Button color="inherit" onClick={() => dispatch(logOutUser())}>
                    LogOut
                  </Button>
                  }
                
                
              </Toolbar>
            </AppBar>
          </Box>
          </nav>
      </header>


      <Outlet/>
    </>
  )
}
export default RootLayout