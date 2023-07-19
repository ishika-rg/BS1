import React from "react";
import "./Email.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Box } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Email = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();



  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    //console.log("otp verification");
    try {
      const response = await axios.post(
        "http://localhost:5000/user/verifyotp",
        { otp, email }
      );
      //console.log(response);
      // window.alert("opt verified !!");
      setMsg("otp verified");

      if (response.status === 200) {
        toast.success("OTP verified Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error("Some Error occured! Please try again.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }

      navigate("/resetpassword", { state: email });
    } catch (err) {
      //console.log(err);
      // window.alert("Invalid otp");
      toast.error("Invalid OTP!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    //console.log("submit btn");
    //console.log(email);

    // 1. check email is valid or not

    // 2. sent otp

    try {
      const response = await axios.post("http://localhost:5000/user/sendotp", {
        email,
      });
      //console.log("msg is sending !!!");
      //console.log(response);
      //console.log(response.status);

      // setMsg(response.data)
      // navigate('/verifyOtp', {state : "ishika"})

      if (response.status === 200) {
        toast.success("Success! OTP sent on registered email", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error("Some Error occured! Please try again.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      setMsg("Email Sent");
    } catch (err) {
      //console.log("new error", err);
      // window.alert("Invalid user !!! Please check your email address...");

      setMsg("Error in sending email, please try with valid email id !!")
      toast.error("Invalid Email!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="email_box">
      {msg === "Email Sent" ? (
        <Box
          sx={{
            margin: "auto",
            p: 4,
            mt: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            width: { xs: "90%", sm: "50%", md: "50%", lg: "40%" },
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            sx={{ fontWeight: "700", pb: 1, pt: 1 }}
          >
            Verify the OTP
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: `var(--lightTextColor)`,
              textAlign: "center",
              paddingBottom: "20px",
            }}
          >
            Please enter the OTP here
          </Typography>

          <Box>
            <form onSubmit={handleVerifyOtp}>
              <TextField
                id="outlined-basic"
                size="small"
                required
                fullWidth
                margin="normal"
                label="Enter OTP"
                variant="outlined"
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  backgroundColor: `var(--blueColor)`,
                  marginBottom: "20px",
                }}
              >
                {" "}
                Verify OTP{" "}
              </Button>
            </form>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            margin: "auto",
            p: 4,
            mt: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // alignItems : "center",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            width: { xs: "90%", sm: "50%", md: "50%", lg: "40%" },
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            sx={{ fontWeight: "700", pb: 1, pt: 1 }}
          >
            Forgot Your Password ?
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: `var(--lightTextColor)`,
              textAlign: "center",
              paddingBottom: "20px",
            }}
          >
            Please enter your registered email
          </Typography>

          <Box>
            <form onSubmit={handleEmailSubmit}>
              <TextField
                id="outlined-basic"
                size="small"
                required
                fullWidth
                margin="normal"
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  backgroundColor: `var(--blueColor)`,
                  marginBottom: "20px",
                }}
              >
                {" "}
                Send OTP{" "}
              </Button>
            </form>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Email;
