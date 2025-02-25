## Family Chore & Rewards App

A lightweight React application for managing family chores, rewarding kids, and tracking progress—all stored locally in the browser. The app offers different experiences for Parents and Children, making it easy for families to stay organized and motivated.

## Overview

This app is designed to help families manage household tasks and reward children for completing their chores. It leverages localStorage to persist user data, chores, and rewards. Users can sign up, log in, and set up their profiles as either a Parent or a Child. Parents can assign chores, manage rewards, and track the progress of their children, while children can view their assigned chores, see their earned points, and redeem rewards.

## Features

- **Authentication & Profile Setup**
  - **Sign Up / Sign In:** Create and log in to an account with secure password hashing using bcrypt.
  - **Profile Setup:** Choose a role (Parent or Child) and, for parents, set a team name.

- **Chore Management**
  - **Add Chore:** Parents can add new chores with details such as description, points, due date, and assignment to a child.
  - **Chore List:** Children can view their pending chores, mark them as completed, and see a progress bar reflecting task completion.
  - **Calendar Integration:** A calendar view to display chores scheduled for a particular date.

- **Rewards System**
  - **Parent Rewards:** Parents can reward children by assigning extra points and defining new rewards.
  - **Child Rewards:** Children can redeem rewards using their unspent points and review their redemption history.

- **Progress & Leveling**
  - **Points & Levels:** Earn points for completed chores and progress through levels (e.g., Beginner, Apprentice, Challenger, etc.), with visual badges indicating current level and progress toward the next milestone.

- **Theming**
  - **Dark Mode:** Toggle between light and dark themes, with the setting saved in localStorage for a consistent user experience.

- **Local Storage Utilities**
  - Comprehensive helper functions manage users, chores, and rewards, ensuring data is persisted across sessions without the need for a backend.

## Technologies

- **React.js:** Functional components with Hooks
- **React Router:** Client-side routing for a multi-page feel
- **bcryptjs:** For secure password hashing
- **react-calendar:** Calendar integration for date-based chore viewing
- **LocalStorage:** Client-side persistence for user data, chores, and rewards