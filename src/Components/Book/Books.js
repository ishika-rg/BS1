import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Book from "./Book.js";
import "./Book.css";

const Books = () => {
  const [data, setData] = useState();

  // getting data from backend api

  const url = "http://localhost:5000/books";

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = () => {
    axios
      .get(url)
      .then((res) => {
        const newData = res.data;
        console.log(newData);

        setData(newData);
      })
      .catch((error) => {
        console.log("Error is :", error);
      });
  };

  // console.log("data.books : ", data.books.length);
  return (
    <div>
      <h1 style={{ padding: "20px", textAlign: "center" }}> Your Books</h1>

      <div className="books_container">
        {data &&
          data.books.map((ele, i) => (
            <div className="book" key={i}>
              <Book ele={ele} getAllData={getAllData} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Books;
