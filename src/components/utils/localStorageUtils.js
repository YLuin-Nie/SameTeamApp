import bcrypt from "bcryptjs";

//  Function to initialize default users and data in localStorage
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

//  Retrieve users from localStorage
export const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];

//  Save updated users to localStorage
export const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
};

//  Authenticate user login using email and password
export const authenticateUser = (email, password) => {
    const users = getUsers();
    const user = users.find(user => user.email.toLowerCase() === email.toLowerCase());

    if (user && bcrypt.compareSync(password, user.password)) {
        localStorage.setItem("loggedInUser", JSON.stringify(user)); //  Store logged-in user
        return user;
    }

    return null; //  Return null if authentication fails
};

//  Get the currently logged-in user
export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("loggedInUser")) || null;
};

//  Log out the user by removing session data
export const logoutUser = () => {
    localStorage.removeItem("loggedInUser");
};

//  Retrieve chores from localStorage, ensuring they have a default `points` value
export const getChores = () => {
    const chores = JSON.parse(localStorage.getItem("chores")) || [];
    return chores.map(chore => ({
        ...chore,
        points: chore.points || 5 //  Default points to 5 if not set
    }));
};

//  Save updated chores to localStorage
export const saveChores = (chores) => {
    localStorage.setItem("chores", JSON.stringify(chores));
};

//  Add a new chore with a points value and standardized date format
export const addChoreToStorage = (chore) => {
    const chores = getChores();
    const newChore = {
        ...chore,
        points: chore.points || 5, //  Default to 5 points if not provided
        date: new Date(chore.date).toISOString() // Ensure date is stored in ISO format
    };
    chores.push(newChore);
    saveChores(chores);
};

//  Update points for a specific user
export const updateUserPoints = (username, points) => {
    const users = getUsers();
    const userIndex = users.findIndex(user => user.username === username);
    
    if (userIndex !== -1) {
        users[userIndex].points = points;
        saveUsers(users);
    }
};

//  Retrieve points for a specific user
export const getUserPoints = (username) => {
    const users = getUsers();
    const user = users.find(user => user.username === username);
    return user ? user.points || 0 : 0;
};
