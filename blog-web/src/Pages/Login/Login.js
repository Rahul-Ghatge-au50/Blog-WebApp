import React, { useContext, useRef, useState } from 'react'
import './login.css';
import { Context } from '../../Context/Context';
import axios from 'axios';

function Login() {

  const email = useRef();
  const passwordRef = useRef();
  const { dispatch } = useContext(Context);
  const [error,setError] = useState(false);
  const [message,setMesg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" })
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: email.current.value,
        password: passwordRef.current.value
      });
      
      if(res.status === 200){
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
      }
    } catch (err) {
      setMesg(err.response.data);
      dispatch({ type: "LOGIN_FAILURE" })
      setError(true)
    }
  }

  return (
    <>
      <div className="login">
        <span className="loginTitle">
          Login
        </span>
        <form onSubmit={handleSubmit} className="loginForm">
          <label>Email</label>
          <input type="text" placeholder='Enter Email' className='loginInput' ref={email} />
          <label>Password</label>
          <input type="password" placeholder='Enter password' className='loginInput' ref={passwordRef} />
          <button type='submit' className='loginBtn' >Login</button>
        </form>
          {
            error &&   <h2 style={{color:'red',marginTop:'10px'}}>{message}</h2>
          }
      </div>
    </>
  )
}

export default Login
