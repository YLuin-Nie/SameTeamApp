-- Create the SameTeamDB database
CREATE DATABASE SameTeamDB;
GO

USE SameTeamDB;
GO

-- Teams Table
CREATE TABLE Teams (
    TeamID INT IDENTITY(1,1) PRIMARY KEY,
    TeamName NVARCHAR(100) NOT NULL UNIQUE
);
GO

-- Users Table
CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    Role NVARCHAR(10) CHECK (Role IN ('Parent', 'Child')) NOT NULL,
    Points INT DEFAULT 0,
    TotalPoints INT DEFAULT 0,
    TeamID INT FOREIGN KEY REFERENCES Teams(TeamID)
);
GO

-- Chores Table
CREATE TABLE Chores (
    ChoreID INT IDENTITY(1,1) PRIMARY KEY,
    ChoreText NVARCHAR(255) NOT NULL,
    Points INT NOT NULL DEFAULT 5,
    AssignedTo INT FOREIGN KEY REFERENCES Users(UserID),
    DateAssigned DATE NOT NULL,
    Completed BIT DEFAULT 0
);
GO

-- Rewards Table
CREATE TABLE Rewards (
    RewardID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Cost INT NOT NULL
);
GO

-- RedeemedRewards Table
CREATE TABLE RedeemedRewards (
    RedemptionID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    RewardID INT FOREIGN KEY REFERENCES Rewards(RewardID),
    PointsSpent INT NOT NULL,
    DateRedeemed DATETIME DEFAULT GETDATE()
);
GO

-- Optional: CompletedChores Log Table
CREATE TABLE CompletedChores (
    CompletedID INT IDENTITY(1,1) PRIMARY KEY,
    ChoreID INT FOREIGN KEY REFERENCES Chores(ChoreID),
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    CompletionDate DATETIME DEFAULT GETDATE()
);
GO
