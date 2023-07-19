import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const VerifyOtp = () => {

    const [otp, setOtp] = useState('')
    // const {state} = useLocation()
    // const {data} = state
    // const data = location.state.name

    const location = useLocation()
    const data = location.state
    console.log("new data", data)

    
    
    const handleVerifyOtp = async(e) => {
        e.preventDefault();
        console.log('verify otp btn')
        console.log(otp)

        try{
            // const response = await axios.post('http://localhost:5000/user/verifyotp', {otp, email})

        }catch(err){
            console.log(err)
        }
    }

  return (
    <div>
        <h1> Verify your otp heree</h1>
        <div className="otp_box">
        <form onSubmit={handleVerifyOtp}>

      <h1>Enter the otp</h1>
      <input
        type="number"
        placeholder="Enter your otp here "
        value={otp}
        onChange = {(e) => setOtp(e.target.value)}
      ></input>
      <button type="submit" >Verify OTP</button>

      </form>
    </div>
    </div>
  )
}

export default VerifyOtp