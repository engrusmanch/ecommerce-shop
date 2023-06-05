import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MyNavbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { authKey, baseUrl } from '../constants/ApiEndPoints';
import axios from 'axios';
import { useNavigate } from "react-router-dom";




export function LoginSignupForm(props) {
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const {setIsAuthenticated}=props;
  const navigate = useNavigate();


  const handleToggle = () => {
    setShowLogin(!showLogin);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (showLogin) {
      // Handle login logic here
      const isAuth = await loginUser(name, password);
      navigate("/");
      if (isAuth) {
        setIsAuthenticated(true); 
     
    } else {
      // Handle signup logic here
    }
  }};
  const loginUser = async (name, password) => {
    try {
      const response = await axios.post(`${baseUrl}${authKey}`, {
        username: name,
        password:password,
      });
      localStorage.setItem('token', response.data.token); 
      console.log(localStorage.getItem('token'));      // Store the token in localStorage
      return true; // Return true if the login is successful
    } catch (error) {
      console.error(error);
      return false; // Return false if the login fails
    }
  };
  const logoutUser = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setIsAuthenticated(false); // Update the isAuthenticated state to false
  };
  

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row>
        <Col>
        <Form onSubmit={handleSubmit} style={{height:"auto",width:"400px",textAlign:"center"}}>
      {showLogin ? (
        <div className='container' style={{height:"78vh"}}>
          <h1>Login Form</h1>
          <Form.Group controlId="formBasicName">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={name} onChange={handleNameChange} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
          </Form.Group>
          <br></br>

          <Button variant="dark" type="submit">
            Login
          </Button>
          <br></br>

          <p>Don't have an account? <a href="#" onClick={handleToggle}>Sign up</a></p>
        </div>
      ) : (
        <div className='container' style={{height:"78vh"}}>
          <h1>Sign Up Form</h1>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
          </Form.Group>

          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" value={name} onChange={handleNameChange} />
          </Form.Group>

          <Form.Group controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter address" value={address} onChange={handleAddressChange} />
          </Form.Group>
          <br></br>
          <Button variant="dark" type="submit">
            Sign Up
          </Button>
          <br></br>


          <p>Already have an account? <a href="#" onClick={handleToggle}>Log in</a></p>
        </div>
      )}
        </Form>
    

        </Col>
      </Row>
    </Container>
    
    
  );
      }


