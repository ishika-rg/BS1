import React from "react";
import "./Home.css";
// import Lottie from "lottie-react";
// import animationData from '../assests/hero.json';

import hero from "../assests/hero.png";
import { Typography, Grid, Button, Box } from "@mui/material";
import {Link} from 'react-router-dom'

import Typewriter from 'react-ts-typewriter';

const Home = () => {
  return (
    <div className="home">
      <Grid container>
        <Grid
        className="box1"
          sm={12}
          md={6}
          p={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }} 

        >
          <Typography pt={5} pb={3} variant="h5" fontWeight={"bold"} color = "#284362">
            Let's make the best investments
          </Typography>
          <Typography
            className="heading"
            sx={{ fontSize: "3rem", fontWeight: "bold", color: "#232F3D" }}
          >
            Your Favourite Online
          </Typography>
          <Typography
            sx={{
              fontSize: "4rem",
              fontWeight: "bold",
              color: "#232F3D",
              paddingBottom: "1rem",
            }}
          >
            {" "}
            BOOKSPOT
          </Typography>
          <Typography variant = "h5" fontWeight = "bold" color = "#284362" pb = {2}> 

          <Typewriter text = "Read Listen Learn Repeat" loop = {true} speed = {120} delay = {50} />

          </Typography>


          





<Link to = '/login'>
          <Button className = "start_btn" sx = {{
            marginTop : "1rem",
            backgroundColor : "#284362",
            padding : " 10px 15px",
            borderRadius : "30px",
            color: "white",
            border : "2px solid #284362",
            fontWeight: "bold"




          }}> Get Started </Button>
          </Link>
        </Grid>
        <Grid sm={12} md={6} className = "img_box" sx={{ paddingLeft: "5rem", paddingTop : "3rem"}}>
          <img src={hero} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
