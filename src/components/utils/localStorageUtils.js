// File Name: localStorageUtils.js

import bcrypt from "bcryptjs";

// ✅ Function to initialize default users and data in localStorage
export const initializeLocalStorage = () => {
    const defaultUsers = [
        { username: "Andrew", password: bcrypt.hashSync("Andrew123", 10), email: "Andrew@yahoo.com", role: "Parent", team: "ABY" },
        { username: "Bansari", password: bcrypt.hashSync("Bansari123", 10), email: "Bansari@yahoo.com", role: "Parent", team: "ABY" },
        { username: "Bob", password: bcrypt.hashSync("Bob123", 10), email: "bob@yahoo.com", role: "Child", team: "ABY" },
        { username: "Luna", password: bcrypt.hashSync("Luna123", 10), email: "Luna@yahoo.com", role: "Child", team: "ABY" }
    ];

    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(defaultUsers));
    }

    if (!localStorage.getItem("teamName")) {
        localStorage.setItem("teamName", "ABY");
    }

    if (!localStorage.getItem("chores")) {
        localStorage.setItem("chores", JSON.stringify([]));
    }
};

// ✅ Retrieve users from localStorage
export const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];

// ✅ Save updated users to localStorage
export const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
};

// ✅ Authenticate user login using email and password
export const authenticateUser = (email, password) => {
    const users = getUsers();
    const user = users.find(user => user.email.toLowerCase() === email.toLowerCase());

    if (user && bcrypt.compareSync(password, user.password)) {
        localStorage.setItem("loggedInUser", JSON.stringify(user)); // ✅ Store logged-in user
        return user;
    }

    return null; // ✅ Return null if authentication fails
};

// ✅ Get the currently logged-in user
export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("loggedInUser")) || null;
};

// ✅ Log out the user by removing session data
export const logoutUser = () => {
    localStorage.removeItem("loggedInUser");
};

// ✅ Retrieve chores from localStorage
export const getChores = () => JSON.parse(localStorage.getItem("chores")) || [];

// ✅ Add a new chore to localStorage
export const addChoreToStorage = (chore) => {
    const chores = getChores();
    chores.push(chore);
    localStorage.setItem("chores", JSON.stringify(chores));
};
