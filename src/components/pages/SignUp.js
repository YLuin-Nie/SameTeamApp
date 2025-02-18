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
    role: "",  // ✅ Allow user to select Parent or Child
    team: "ABY",
  });

  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, role, team } = formData;

    if (!role) {
      setErrors("Please select a role (Parent or Child).");
      return;
    }

    const users = getUsers();
    if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
      setErrors("Email already registered.");
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { username, email, password: hashedPassword, role, team };

    users.push(newUser);
    saveUsers(users); // ✅ Properly update users in localStorage

    localStorage.setItem("loggedInUser", JSON.stringify(newUser)); // ✅ Store the new user as logged in

    alert("Sign-up successful! Redirecting to dashboard...");

    // ✅ Redirect user immediately to the correct dashboard
    if (role === "Parent") {
      navigate("/parent-dashboard");
    } else {
      navigate("/child-dashboard");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {errors && <p style={{ color: "red" }}>{errors}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />

        {/* ✅ Role Selection */}
        <label>Select Role:</label>
        <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
          <option value="">Select...</option>
          <option value="Parent">Parent</option>
          <option value="Child">Child</option>
        </select>

        <button type="submit">Sign Up</button>
      </form>

      <button className="back-button" onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default SignUp;
