// File Name: SignUp.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { getUsers, saveUsers, initializeLocalStorage } from "../utils/localStorageUtils";
import "../styles/signup.css";

const SignUp = () => {
  const navigate = useNavigate();
  initializeLocalStorage(); // Ensure local storage is initialized

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "Parent",
    team: "ABY", // Default team
  });

  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, role, team } = formData;
    
    const users = getUsers(); // Fetch users from localStorage
    if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
      setErrors("Email already registered.");
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ username, email, password: hashedPassword, role, team });
    saveUsers(users); // ✅ Properly update users in localStorage

    alert("Sign-up successful! Proceeding to profile setup...");
    navigate("/profile-setup");
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {errors && <p style={{ color: "red" }}>{errors}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
        <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        <input type="password" placeholder="Password (min 6 chars)" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
