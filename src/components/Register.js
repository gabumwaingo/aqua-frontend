// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

const API_URL = process.env.REACT_APP_API_URL;

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("✅ User registered, redirecting to login...");
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMessage("❌ " + (data.message || "Registration failed"));
      }
    } catch (err) {
      console.error("Network error:", err);
      setMessage("❌ Network error, please try again");
    }
  };

  return (
    <AuthLayout>
      <div className="card shadow p-4 w-100 fade-in" style={{ maxWidth: 400 }}>
        <h2 className="mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name:</label><br/>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="form-control form-control-lg"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label><br/>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="form-control form-control-lg"
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Password:</label><br/>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="form-control form-control-lg"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg w-100">
            Sign Up
          </button>
        </form>
        {message && <p className="mt-3 text-center">{message}</p>}
      </div>
    </AuthLayout>
  );
}

export default Register;
