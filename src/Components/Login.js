import {React, useState, useEffect } from 'react'
import { Box, Grid, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, TextField, Container } from "@mui/material";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { Theme } from "./Theme";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useStyles } from "./Login_Signup_styles";







function Login() {
  const classes = useStyles();
  const theme = createTheme();
  let navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState(false)


  
  const [user, setUser] = useState({ 
    email: "",
    password : "",

  })
  let name, value;

  const handleInputs = (e) => {
    // console.log(e)
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name]:value })
  }

  const{email, password} = user;

  const handleLoginUser = async (event) => {
    event.preventDefault();
  
    let url = 'http://localhost:5000/user/login';
    let options = {
      method : 'POST',
      url : url,
      headers : {
        'Content-Type' : 'application/json'
      },
      data :  JSON.stringify({email, password})
    }
  
    try{
      let response = await axios(options)
      console.log(response)              // gives complete response
      console.log(response.data);        // gives message and token
      // console.log(response.config.data)  gives email, password 
  
      setAuthenticated(true)
      if(response.status === 200){
        toast.success("Logged in successfully !", {
          position : toast.POSITION.TOP_LEFT
        })
  
  
         localStorage.setItem("token", response.data.token)
        //  window.location('/dashboard')
  
        // navigate('/dashboard', {replace : true})
        setTimeout(() => {
          navigate('/dashboard', {replace : true})
        }, 4000)
  
        
      }else{
        toast.error("Invalid credentials!", {
          position: toast.POSITION.TOP_LEFT })
      }
  
    }catch(err){
      console.log(err)
      toast.error("Invalid credentials!", {
        position : toast.POSITION.TOP_LEFT
      })
  
    }
  
  };



  return (

    <Box className={classes.signup}>
    <Grid
      container
      rowSpacing={0}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ height: "100%" }}
    >
      
      <Grid className={classes.signup_right} item xs={6}>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar> */}
              <Typography
                component="h3"
                variant="h4"
                sx={{ fontWeight: "700", pb:3, pt : 8}}
              >
                Sign In to your account
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 2 }}
                method = 'POST'

              >
                <Grid container spacing={2}>
                  <ToastContainer />
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="email"
                      required
                      fullWidth
                      id="email"
                      label=" Email"
                      
                      size="small"
                      autoFocus
                      className={classes.root}
                      value = {user.email}
                      onChange = {handleInputs}
                      InputLabelProps={{
                        sx: {
                          fontSize : 14,
                          // set the color of the label when not shrinked
                          color: "default",
                          [`&.${inputLabelClasses.shrink}`]: {
                            // set the color of the label when shrinked (usually when the TextField is focused)
                            color: Theme.colors.blueColor
                          }
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="password"
                      label="Password "
                      name="password"
                      type = "password"
                      autoComplete="new-password"
                      size="small"
                      className={classes.root}
                      value = {user.password}
                      onChange = {handleInputs}
                      InputLabelProps={{
                        sx: {
                          fontSize : 14,
                          // set the color of the label when not shrinked
                          color: "default",
                          [`&.${inputLabelClasses.shrink}`]: {
                            // set the color of the label when shrinked (usually when the TextField is focused)
                            color: Theme.colors.blueColor
                          }
                        }
                      }}
                    />
                  </Grid>
                  

                </Grid>

                <Box className={classes.dark_btn}>
                  <Button
                    variant="outlined"
                    type="submit"
                    sx={{ mt: 3, mb: 2 }}
                    className={classes.dark_button}
                    onClick={handleLoginUser}

                  >
                    LOGIN
                  </Button>
                </Box>

                <Link to='/forget_password'>Forget Password</Link>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </Grid>

      <Grid className={classes.signup_left} item xs={6}>
        <Box>
          <Typography variant="h3" component="h4" className={classes.title}>
           Hello Friend! 
          </Typography>
        </Box>

        <Typography variant="h6" component="h3" className={classes.subtitle}>
          Enter your details and start your journey with us
        </Typography>
        <Box className={classes.btn}>
          <Button
            variant="outlined"
            component={Link}
            to="/signup"
            className={classes.button}
          >
            SIGN UP
          </Button>
        </Box>
      </Grid>

    </Grid>
  </Box>

  )
}

export default Login