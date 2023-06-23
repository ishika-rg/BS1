import { React, useState } from "react";
import { useStyles } from "./Login_Signup_styles";
import { Box, Grid, Typography, Button } from "@mui/material";
import { Link, useNavigate  } from "react-router-dom";
import { Theme } from "./Theme";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios'

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, TextField, Container } from "@mui/material";
import { inputLabelClasses } from "@mui/material/InputLabel";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function Signup() {
  const classes = useStyles();
  const theme = createTheme();
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    user_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [err, setErr] = useState({
    nameErr : "",
    user_nameErr : "",
    emailErr : "",
    passwordErr : "",
    c_passwordErr : ""
  })
  let name, value;

  const handleInputs = (e) => {
    // console.log(e)
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    

    const{name, user_name, email, password, confirm_password} = user;

   if( validForm() ){
    //http://localhost:4000/user/signup
    let url = 'http://localhost:5000/user/signup';
    let options = {
      method : 'POST',
      url : url,
      headers : {
        'Content-Type' : 'application/json'
      },
      data :  JSON.stringify({
        name, user_name, email, password, c_password : confirm_password          })
    }

    try{

      let response = await axios(options)
      console.log(response)
      if( response.status === 201){
        toast.success("Registration successful !")
        setTimeout(() => {
          
          navigate('/login', {replace : true})

        }, 4000)
      }else{
        toast.error("Invalid Registration!")
        console.log(response.message)
      }

    }catch(err){
      toast.error("The given email already exists! ")
      console.log(err.message)
    }


   }else{
    toast.error("Invalid Submission !" )
    console.log("invalid submission !")
   }

  

       
  //     const { data } = await axios.post('http://localhost:5000', 
  //     JSON.stringify({
  //            name, user_name, email, password, c_password : confirm_password}), config
        
  //     )

  //     console.log({data})

   


  //  if(validForm()){

   
  //   const{name, user_name, email, password, confirm_password} = user;   //this gives value user.name....
  //   const res = await fetch("/signup", {
  //     method : 'POST',
  //     headers :{
  //       'Content-Type' : 'application/json'
  //     },
  //     body : JSON.stringify({
  //       name, user_name, email, password, c_password : confirm_password
  //     })
  //   })

  //   try{
  //   const data = await res.json();
  //   console.log(data.response)
  //   if(data.status === '422' || !data){
  //     window.alert("Registration invalid! ")
  //     console.log("Registration invlalid")

  //   }
  //   else{
  //        window.alert("  Registration successful !")
  //        navigate("/login");

  //   }
  // }
  // catch(err){
  //   console.log(err)
  //   window.alert('form not registered!!!')
  // }
  //  }
   };

  //  validation of form

  const validForm = () => {
    let formIsValid = true;
    setErr({
      nameErr : "",
    user_nameErr : "",
    emailErr : "",
    passwordErr : "",
    c_passwordErr : ""

    })

    const validEmail = RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
    if(user.name == ""){
      formIsValid = false;
      setErr(prevState => ({
        ...prevState, nameErr : "Please enter name"
      }))
    }
    if(user.user_name == ""){
      formIsValid = false;
      setErr(prevState => ({
        ...prevState, user_nameErr : "Please enter user name"
      }))
    }
    if(user.email == ""){
      formIsValid = false;
      setErr(prevState => ({
        ...prevState, emailErr : "Please enter email"
      }))
    }
    if(user.email !== "" && !validEmail.test(user.email)){
      formIsValid = false;
      setErr(prevState => ({
        ...prevState, emailErr : "Please enter a valid email"
      }))
    }
    if(user.password.length < 6){
      formIsValid = false;
      setErr(prevState => ({
        ...prevState, passwordErr : "Please enter password of minimum 6 characters"
      }))
    }
    if(user.confirm_password === "" ){
      formIsValid = false;
      setErr(prevState => ({
        ...prevState, c_passwordErr : "Please confirm your password"
      }))
    }
    if(user.confirm_password !== "" && user.confirm_password !== user.password){
      formIsValid = false;
      setErr(prevState => ({
        ...prevState, c_passwordErr : "Passwords are not matched"
      }))
    }





  return formIsValid

  }

  return (
    <Box className={classes.signup}>
      <Grid
        container
        rowSpacing={0}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ height: "100%" }}
      >
        <Grid className={classes.signup_left} item xs={6}>
          <Box>
            <Typography variant="h3" component="h4" className={classes.title}>
              Welcome Back !
            </Typography>
          </Box>

          <Typography variant="h6" component="h3" className={classes.subtitle}>
            To keep connected with us please login with your personal info
          </Typography>
          <Box className={classes.btn}>
            <Button
              variant="outlined"
              component={Link}
              to="/login"
              className={classes.button}
            >
              Login
            </Button>
          </Box>
        </Grid>
        <Grid className={classes.signup_right} item xs={6}>
          <ThemeProvider theme={theme}>
            <ToastContainer/>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  // marginTop: 1,
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
                  sx={{ fontWeight: "700" }}
                >
                  Create Account
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 2 }}
                  method = 'POST'
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="given-name"
                        name="name"
                        required
                        fullWidth
                        id="firstName"
                        label=" Name"
                        size="small"
                        autoFocus
                        className={classes.root}
                        value={user.name}
                        onChange={handleInputs}
                        InputLabelProps={{
                          sx: {
                            fontSize: 14,
                            // set the color of the label when not shrinked
                            color: "default",
                            [`&.${inputLabelClasses.shrink}`]: {
                              // set the color of the label when shrinked (usually when the TextField is focused)
                              color: `${Theme.colors.tealGreen}`,
                            },
                          },
                        }}
                      />
                      {
                        err.nameErr.length > 0 && <span className = {classes.validateError}>{err.nameErr}</span>
                      }
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        autoComplete="given-name"
                        name="user_name"
                        required
                        fullWidth
                        id="user_name"
                        label=" User Name"
                        size="small"
                        autoFocus
                        className={classes.root}
                        value={user.user_name}
                        onChange={handleInputs}
                        InputLabelProps={{
                          sx: {
                            fontSize: 14,
                            // set the color of the label when not shrinked
                            color: "default",
                            [`&.${inputLabelClasses.shrink}`]: {
                              // set the color of the label when shrinked (usually when the TextField is focused)
                              color: Theme.colors.tealGreen,
                            },
                          },
                        }}
                      />
                       {
                        err.user_nameErr.length > 0 && <span className = {classes.validateError}>{err.user_nameErr}</span>
                      }
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email "
                        name="email"
                        autoComplete="email"
                        size="small"
                        className={classes.root}
                        value={user.email}
                        onChange={handleInputs}
                        InputLabelProps={{
                          sx: {
                            fontSize: 14,
                            // set the color of the label when not shrinked
                            color: "default",
                            [`&.${inputLabelClasses.shrink}`]: {
                              // set the color of the label when shrinked (usually when the TextField is focused)
                              color: Theme.colors.tealGreen,
                            },
                          },
                        }}
                      />
                       {
                        err.emailErr.length > 0 && <span className = {classes.validateError}>{err.emailErr}</span>
                      }
                      
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        size="small"
                        className={classes.root}
                        value={user.passsword}
                        onChange={handleInputs}
                        InputLabelProps={{
                          sx: {
                            fontSize: 14,
                            // set the color of the label when not shrinked
                            color: "default",
                            [`&.${inputLabelClasses.shrink}`]: {
                              // set the color of the label when shrinked (usually when the TextField is focused)
                              color: Theme.colors.tealGreen,
                            },
                          },
                        }}
                      />
                       {
                        err.passwordErr.length > 0 && <span className = {classes.validateError}>{err.passwordErr}</span>
                      }
                      
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="confirm_password"
                        label="Confirm Password"
                        type="password"
                        id="c_password"
                        autoComplete="confirm-password"
                        size="small"
                        className={classes.root}
                        value={user.c_password}
                        onChange={handleInputs}
                        InputLabelProps={{
                          sx: {
                            fontSize: 14,
                            // set the color of the label when not shrinked
                            color: "default",
                            [`&.${inputLabelClasses.shrink}`]: {
                              // set the color of the label when shrinked (usually when the TextField is focused)
                              color: Theme.colors.tealGreen,
                            },
                          },
                        }}
                      />
                       {
                        err.c_passwordErr.length > 0 && <span className = {classes.validateError}>{err.c_passwordErr}</span>
                      }
                     
                    </Grid>
                    {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
                  </Grid>

                  <Box className={classes.dark_btn}>
                    <Button
                      variant="outlined"
                      type="submit"
                      sx={{ mt: 3, mb: 2 }}
                      className={classes.dark_button}
                    >
                      SIGN UP
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Grid>
      </Grid>
    </Box>
  );
}



export default Signup;
