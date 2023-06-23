import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Book.css";
// import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";

const Book = ({ele, getAllData}) => {

  const { _id, name, author, description, image, price, available } = ele;


  
  const DeleteFnc = async(id) => {

    console.log("delete button clicked")
    await axios.delete(`http://localhost:5000/books/${_id}`)
    .then((res) => console.log(res.data))
    .then(() => {
      
      // alert('book delted successfully')
      getAllData()

      

    }
    )
    // useEffect(() => {
    //   const deleteHandler = async () => {
    //     await axios
    //       .delete(`http://localhost:5000/books/${_id}`)
    //       .then((res) => res.data)
    //       .then(() =>
    //         // alert('Book deleted successfully !')
    //         navigate("/books")
    //       );
    //   };

    //   deleteHandler();
    // }, []);
  };

  return (
    <div className="book_card">
      <img src={image} alt={name} />

      <div className="book_details">
        <article>By {author}</article>
        <h3>{name}</h3>
        <p> {description.substring(0, 60) + "..."}</p>
        <h2>₹ {price} </h2>

        <Stack direction="row-reverse" spacing={1}>
          <IconButton
            aria-label="edit"
            color="primary"
            LinkComponent={Link}
            to={`/books/${_id}`}
          >
            <ModeEditIcon />
          </IconButton>

          <IconButton aria-label="delete" color="primary" onClick={() => DeleteFnc(_id)}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </div>
    </div>
  );
};

export default Book;
