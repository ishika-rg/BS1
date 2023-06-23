import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const BookDetail = () => {
  const navigate = useNavigate()
  const [checked, setChecked] = useState(false);
  const [inputs, setInputs] = useState({});

  const id = useParams().id; //with useParams(), after dot(.) we have to pass the name of the param i.e. id here
  // it is const id =  useParams().new_id --> this "id" must be the same variable name
  // as it is written in App.js in Route path = '/books/:new_id'

  // console.log(id);
  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/books/${id}`)
        .then((res) => res.data.data)
        .then((data) => setInputs(data.book));
      // .then((res) => console.log(res.data.data))
    };

    fetchHandler();
     fetchHandler().then((res) => setInputs(res.data.data.book))
  }, [id]);

  // send request function to save the updated data in database
  const sendPutRequest = async() => {
    await axios.put(`http://localhost:5000/books/${id}`, {

      name : String(inputs.name),
      author : String(inputs.author),
      description  :String(inputs.description),
      price : Number(inputs.price),
      image : String(inputs.image),
      available : Boolean(checked)
  
    }).then((res) => res.data)

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPutRequest().then(() => navigate('/books'))

  };
  const handleChange = (e) => {

    //  in this function also, we will chnage the input values
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value,
    })
    )
  };

  // console.log(inputs);

  return (
    <div>
      <h2 className="form_heading">Update book here</h2>

      {inputs && (
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
              name="name"
              color="primary"
              // label="Enter Book Name"
              sx={{ marginBottom: "15px", marginTop: "7px" }}
              size="small"
              fullWidth
              required
              value={inputs.name}
              onChange={handleChange}
            />

            <FormLabel sx={{ color: "#232F3D", fontWeight: "bold" }}>
              Author{" "}
            </FormLabel>

            <TextField
              type="text"
              variant="outlined"
              name="author"
              color="primary"
              // label="Enter author name"
              fullWidth
              required
              sx={{ marginBottom: "15px", marginTop: "7px" }}
              size="small"
              value={inputs.author}
              onChange={handleChange}
            />

            <FormLabel sx={{ color: "#232F3D", fontWeight: "bold" }}>
              Description{" "}
            </FormLabel>

            <TextField
              type="text"
              variant="outlined"
              name="description"
              color="primary"
              // label="Enter description"
              required
              fullWidth
              sx={{ marginBottom: "15px", marginTop: "7px" }}
              size="small"
              value={inputs.description}
              onChange={handleChange}

              // onChange={(e) => setPassword(e.target.value)}
              // value={password}
            />

            <FormLabel sx={{ color: "#232F3D", fontWeight: "bold" }}>
              Price{" "}
            </FormLabel>

            <TextField
              type="number"
              variant="outlined"
              name="price"
              color="primary"
              // label="Enter price"
              fullWidth
              required
              sx={{ marginBottom: "15px", marginTop: "7px" }}
              size="small"
              value={inputs.price}
              onChange={handleChange}
              // onChange={(e) => setDateOfBirth(e.target.value)}
              // value={dateOfBirth}
            />

            <FormLabel sx={{ color: "#232F3D", fontWeight: "bold" }}>
              Image{" "}
            </FormLabel>

            <TextField
              type="text"
              variant="outlined"
              name="image"
              color="primary"
              // label="Enter image url"
              fullWidth
              required
              sx={{ marginBottom: "15px", marginTop: "7px" }}
              size="small"
              value={inputs.image}
              onChange={handleChange}
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
              variant="outlined"
              color="primary"
              type="submit"
              sx={{ margin: " 0 auto" }}
            >
              Update Book
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BookDetail;
