
import React, { useState } from "react";
import bcrypt from "bcryptjs";
import "../components/styles/signup.css";

const SignIn = ({ onSignInSuccess }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(user => user.email === formData.email.trim());

    if (!foundUser) {
      setError("Invalid email or password.");
      return;
    }

    // Verify hashed password
    const passwordMatch = await bcrypt.compare(formData.password.trim(), foundUser.password);
    if (!passwordMatch) {
      setError("Invalid email or password.");
      return;
    }

    // Save authenticated user in localStorage
    localStorage.setItem("currentUser", JSON.stringify(foundUser));

    // Redirect based on role
    onSignInSuccess(foundUser);
  };

  return (
    <div className="signup-container">
      <h2>Sign In</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
