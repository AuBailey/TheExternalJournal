# Users
CREATE TABLE Users
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    emailVerified BOOLEAN DEFAULT 0,
    verifyEmailCode VARCHAR(36) NOT NULL,
    password VARCHAR(255) NOT NULL,
    tempMfaSecret VARCHAR(52) DEFAULT NULL,
    mfaSecret VARCHAR(52) DEFAULT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP  NOT NULL
);
CREATE UNIQUE INDEX Users_email_uindex ON Users (email);


# User Roles
CREATE TABLE Roles
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);
CREATE UNIQUE INDEX Roles_name_uindex ON Roles (name);

# Insert Initial Admin Role
INSERT INTO Roles (name) VALUES ('admin');

# User Roles Cross Reference Table
CREATE TABLE UsersRolesXRef
(
    userId INT NOT NULL,
    roleId INT NOT NULL,
    CONSTRAINT User_fk FOREIGN KEY (userId) REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT Roles_fk FOREIGN KEY (roleId) REFERENCES Roles (id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX UsersRolesXRef_userId_roleId_uindex ON UsersRolesXRef (userId, roleId);

# Journals Table
CREATE TABLE Journals
(
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    userId int NOT NULL,
    name VARCHAR(50),
    CONSTRAINT Users_fk FOREIGN KEY (userId) REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

# Entries Table
CREATE TABLE Entries
(
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    journalId int NOT NULL,
    name VARCHAR(50) NOT NULL,
    lat FLOAT DEFAULT NULL ,
    lng FLOAT DEFAULT NULL ,
    city varchar(80) DEFAULT NULL ,
    content LONGTEXT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL ,
    CONSTRAINT Journals_fk FOREIGN KEY (journalId) REFERENCES Journals (id) ON DELETE CASCADE ON UPDATE CASCADE
);