import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // For navigation after login
import './Login.css'; // Import CSS for styling

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if both fields are filled
    if (email && password) {
      // Navigate to the next page (e.g., home page)
      navigate("/RepairLanding"); // Change this to the desired page
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="register-link">
        Don't have an account? <Link to="/Register">Register hre</Link>
      </p>
    </div>
  );
};

export default Login;