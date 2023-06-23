import React, { useState } from "react";
import "./Book/Book.css";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {
  TextField,
  Button,
  Container,
  Stack,
  Box,
  FormLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const AddBook = () => {

  const navigate = useNavigate()

  const [inputs, setInputs] = useState({
    name : "",
    author : "",
    description : "",
    price : "",
    image : "",
  })
  const [checked, setChecked] = useState(false);


  const handleChange = (e) => {
    // console.log(e.target.name, " the value is : ", e.target.value)

    setInputs((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value,
    })
    )
  }
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");

 //  to send request or data to database
 const sendRequest =  async() => {

   const data = await axios.post('http://localhost:5000/books', {
    name : String(inputs.name),
    author : String(inputs.author),
    description  :String(inputs.description),
    price : Number(inputs.price),
    image : String(inputs.image),
    available : Boolean(checked)

   
  , 
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
   )

  .then((res) => res.data)

}


  function handleSubmit(e) {
    e.preventDefault();
    console.log(inputs, checked);
    // sendRequest()
    sendRequest().then(() => navigate('/books'))
  }

 

  return (
    <div>
      <h2 className="form_heading">Add new book here</h2>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent={"center"}
          maxWidth={600}
          alignContent={"center"}
          alignSelf="center"
          marginLeft={"auto"}
          marginRight="auto"
          marginTop={2}
        >
          <FormLabel sx={{ color: "#232F3D", fontWeight: "bold" }}>
            Book Name
          </FormLabel>
          <TextField
            type="text"
            variant="outlined"
            name = "name"
            color="primary"
            label="Enter Book Name"
            sx={{ marginBottom: "15px", marginTop: "7px" }}
            size="small"
            fullWidth
            required

            value = {inputs.name}
            onChange = {handleChange}
             // onChange={(e) => setFirstName(e.target.value)}
            // value={firstName}
          />

          <FormLabel sx={{ color: "#232F3D", fontWeight: "bold" }}>
            Author{" "}
          </FormLabel>

          <TextField
            type="text"
            variant="outlined"
            name = "author"
            color="primary"
            label="Enter author name" 
            fullWidth
            required
            sx={{ marginBottom: "15px", marginTop: "7px" }}
            size="small"

            value = {inputs.author}
            onChange = {handleChange}
            // onChange={(e) => setEmail(e.target.value)}
            // value={email}
          />

          <FormLabel sx={{ color: "#232F3D", fontWeight: "bold" }}>
            Description{" "}
          </FormLabel>

          <TextField
            type="text"
            variant="outlined"
            name = "description"
            color="primary"
            label="Enter description"
            required
            fullWidth
            sx={{ marginBottom: "15px", marginTop: "7px" }}
            size="small"

            value = {inputs.description}
            onChange = {handleChange}

            // onChange={(e) => setPassword(e.target.value)}
            // value={password}
          />

          <FormLabel sx={{ color: "#232F3D", fontWeight: "bold" }}>
            Price{" "}
          </FormLabel>

          <TextField
            type="number"
            variant="outlined"
            name = "price"
            color="primary"
            label="Enter price"
            fullWidth
            required
            sx={{ marginBottom: "15px", marginTop: "7px" }}
            size="small"
            
            value = {inputs.price}
            onChange = {handleChange}
            // onChange={(e) => setDateOfBirth(e.target.value)}
            // value={dateOfBirth}
          />

          <FormLabel sx={{ color: "#232F3D", fontWeight: "bold" }}>
            Image{" "}
          </FormLabel>

          <TextField
            type="text"
            variant="outlined"
            name = "image"
            color="primary"
            label="Enter image url"
            fullWidth
            required
            sx={{ marginBottom: "15px", marginTop: "7px" }}
            size="small"

            value = {inputs.image}
            onChange = {handleChange}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            }
            label="Available"
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ margin: " 20px auto" }}
          >
            Add Book
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBook;
