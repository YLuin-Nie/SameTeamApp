import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation
import bcrypt from "bcryptjs"; 
import "../components/styles/signup.css";

const SignUp = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Parent",
  });

  const [errors, setErrors] = useState("");

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => password.length >= 6;
  const sanitizeInput = (input) => input.trim().replace(/<[^>]+>/g, "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = formData;

    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email);
    const cleanPassword = sanitizeInput(password);

    if (!cleanName || !validateEmail(cleanEmail) || !validatePassword(cleanPassword)) {
      setErrors("Invalid input. Ensure all fields are correctly filled.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((user) => user.email === cleanEmail)) {
      setErrors("Email already registered.");
      return;
    }

    const hashedPassword = bcrypt.hashSync(cleanPassword, 10);

    const newUser = { name: cleanName, email: cleanEmail, password: hashedPassword, role };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Sign-up successful! Proceeding to profile setup...");

    // ✅ Navigate to Profile Setup Page
    navigate("/profile-setup");
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      {errors && <p style={{ color: "red" }}>{errors}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        <input type="password" placeholder="Password (min 6 chars)" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
