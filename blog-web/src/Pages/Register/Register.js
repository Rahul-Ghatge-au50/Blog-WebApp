import React, { useState } from 'react';
import './register.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username, email, password
      });
      res.data && window.location.replace('/login');
    } catch (error) {
      console.log("Error in handleSubmit :",error.message);
      setError(true)
    }

  }


  return (
    <>
      <div className="register">
        <span className="registerTitle">
          Register
        </span>
        <form action="" className="registerForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input type="text" placeholder='Enter Name' className='registerInput' onChange={e => setUsername(e.target.value)} />
          <label>Email</label>
          <input type="email" placeholder='Enter email' className='registerInput' onChange={e => setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" placeholder='Enter password' className='registerInput' onChange={e => setPassword(e.target.value)} />
          <button type='submit' className='registerBtn'>Register</button>
        </form>

        {
          error && <h3 style={{ color: 'Red', marginTop: '20px' }}>Wrong Creditianls</h3>
        }

      </div>
    </>
  )
}

export default Register
