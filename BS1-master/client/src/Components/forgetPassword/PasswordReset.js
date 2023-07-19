import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { Typography, TextField, Button, Box } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [c_password, setc_password] = useState("");

  const [err, setErr] = useState({
    passwordErr: "",
    c_passwordErr: "",
  });

  const location = useLocation();
  const email = location.state;
  const navigate = useNavigate();

  // //console.log("new data", email)
  // //console.log(c_password)


  const handleResetPassword = async (e) => {
    e.preventDefault();
    //console.log("reset password btn");

    if (validForm()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/user/forgotPassword",
          { email, newPassword }
        );
        //console.log("final response", response);
        //console.log("newPassword is ", newPassword);

        if (response.status === 200) {
          toast.success("Password Reset Successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 4000);
        } else {
          toast.error("Some Error occured! Please try again.", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } catch (err) {
        //console.log(err);
        // window.alert("Some error occured. Please try again !!!");
        toast.error("Some Error occured! Please try again.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  const validForm = () => {
    let formIsValid = true;

    // setErr({
    //   passwordErr : "",
    //   c_passwordErr : ""
    // })

    if (newPassword.length < 6) {
      formIsValid = false;
      setErr({
        passwordErr: "Please enter password of minimum 6 characters",
        c_password: "",
      });
      toast.error("Please enter password of minimum 6 characters", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    if (c_password === "") {
      formIsValid = false;
      setErr((prevState) => ({
        ...prevState,
        c_passwordErr: "Please confirm your password",
      }));
      toast.error(err.c_passwordErr, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (c_password !== "" && c_password !== newPassword) {
      formIsValid = false;
      setErr((prevState) => ({
        ...prevState,
        c_passwordErr: "Passwords are not matched",
      }));
      toast.error("Passwords are not matched", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    return formIsValid;
  };

  return (
    <div>
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
          Reset Password
        </Typography>

        <Box>
          <form onSubmit={handleResetPassword}>
            <TextField
              id="outlined-basic"
              size="small"
              required
              fullWidth
              margin="normal"
              label="Enter Password"
              variant="outlined"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <TextField
              id="outlined"
              size="small"
              required
              fullWidth
              margin="normal"
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={c_password}
              onChange={(e) => setc_password(e.target.value)}
            />

            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                backgroundColor: `var(--blueColor)`,
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              {" "}
              Reset Password{" "}
            </Button>
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default PasswordReset;
