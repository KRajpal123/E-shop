import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LoginURL = "http://localhost:8080/login";

function Login(props) {

  const { toggleSignUpLogin } = props;
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios.post(LoginURL, formData)
      .then((res) => {
        console.log(res)
        if (res.status === 200
          && res.data
          && res.data.email
          && res.data.name
        ) {
          localStorage.setItem('user', JSON.stringify(formData));
          navigate('/home')
        }
        else {
          alert("enter correct details ")
        }
      })
      .catch((err) => {
        alert(err, " user details not found" ,err.result)
      })
  };

  return (
    <div className='container'>
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: '10px 0px' }}>
            <button type="submit">Submit</button>
            <button onClick={toggleSignUpLogin}>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
