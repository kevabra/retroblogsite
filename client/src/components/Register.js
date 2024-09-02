// src/components/Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const navigate = useNavigate();  // useNavigate hook for navigation

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        username,
        password
      });
      setUsername('');
      setPassword('');
      setRegisterError('');
      setRegisterSuccess('Registration successful! You can now log in.');
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after a short delay
    } catch (error) {
      setRegisterError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Register</h2>
      <Form onSubmit={handleRegister}>
        {registerError && <Alert variant="danger">{registerError}</Alert>}
        {registerSuccess && <Alert variant="success">{registerSuccess}</Alert>}
        <Form.Group controlId="formRegisterUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formRegisterPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Register
        </Button>
      </Form>
      <p className="mt-3">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
