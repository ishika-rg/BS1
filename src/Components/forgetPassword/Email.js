import React from "react";
import "./Email.css";
import { useState } from "react";

const Email = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log('submit btn')
    console.log(email)
  }
  return (
    <div className="email_box">
        <form onSubmit={handleSubmit}>

      <h1>Enter your email</h1>
      <input
        type="email"
        placeholder="Enter your registered email "
        value={email}
        onChange = {(e) => setEmail(e.target.value)}
      ></input>
      <button type="submit" >Send OTP</button>

      </form>
    </div>
  );
};

export default Email;
