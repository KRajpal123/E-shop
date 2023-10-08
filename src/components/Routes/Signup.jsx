import axios from 'axios';
import React, { useState } from 'react'



const userAPi = "http://localhost:8080/register";

const Signup = (props) => {
  const { toggleSignUpLogin} = props;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(userAPi, formData).then((res) => {
      console.log(res, "response");
      localStorage.setItem("user", JSON.stringify(formData));
      alert("account created, kindly login");
      setFormData({
        name: '',
        email: '',
        password: '',
      });
      console.log(formData)
    }).catch((err) => {
      console.log(err, "error");
    })
  };


  return (
    <div className="container">
      <div className="signup">
        <h1 style={{
          textAlign: 'center',
          borderBottom: "2px solid green",
          marginBottom: 5,
          color: 'green'
        }}>Welcome E- <span>shop</span></h1>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0px' }}>
            <button type="submit">Sign Up</button>
            <button onClick={toggleSignUpLogin}>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup