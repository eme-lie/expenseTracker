-- MySQL code to create the structure of the Expense Tracker database
-- Create User table
CREATE TABLE User (
  UserID INTEGER PRIMARY KEY AUTO_INCREMENT,
  Username VARCHAR(50) UNIQUE,
  Password VARCHAR(100),
  Email VARCHAR(100) UNIQUE,
  FirstName VARCHAR(50),
  LastName VARCHAR(50),
  DateOfBirth DATE
);

-- Create Category table
CREATE TABLE Category (
  CategoryID INTEGER PRIMARY KEY AUTO_INCREMENT,
  CategoryName VARCHAR(50)
);

-- Create Transaction table
CREATE TABLE Transaction (
  TransactionID INTEGER PRIMARY KEY AUTO_INCREMENT,
  Type ENUM('income', 'expense'),
  Amount DECIMAL (10, 2),
  Date DATE,
  CategoryID INTEGER,
  Description VARCHAR(255),
  UserID INTEGER, 
  FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID),
  FOREIGN KEY (UserID) REFERENCES User (UserID)
);

-- Insert sample data into Category table
INSERT INTO Category (CategoryName) 
VALUES
('Food'),
('Transportation'),
('Rent'),
('Salary'),
('Kids'),
('Shopping'),
('Groceries'),
('Bills'),
('Student loans'),
('Travel'),
('Passive income');

-- Insert sample data into User table
INSERT INTO User (Username, Password, Email, FirstName, LastName, DateOfBirth) 
VALUES 
	('john123', 'password123', 'john@example.com', 'John', 'Doe', '1990-05-15'),
	('jane456', 'pass1234', 'jane@example.com', 'Jane', 'Smith', '1995-09-22'),
	('adam789', 'password123', 'adam@example.com', 'Adam', 'Jenkins', '1991-01-12'),
	('zoe1011', 'pass1234', 'zoe@example.com', 'Zoe', 'de Gaul', '1995-12-22');

-- Insert sample data into Transaction table
INSERT INTO Transaction (Type, Amount, Date, CategoryID, Description, UserID)
VALUES
  ('expense', -25.50, '2024-02-20', 1, 'Lunch at a restaurant', 1),
  ('expense', -50.00, '2024-02-22', 2, 'Bus fare', 1),
  ('income', 1000.00, '2024-02-25', 4, 'Monthly salary', 1),
  ('expense', -800.00, '2024-02-28', 3, 'Rent payment', 1),

  ('expense', -5.50, '2024-02-20', 1, 'Starbucks', 2),
  ('expense', -30.00, '2024-02-22', 10, 'Trip to Edinburgh', 2),
  ('income', 5000.00, '2024-02-25', 4, 'Monthly salary', 2),
  ('expense', -40.00, '2024-02-28', 7, 'Asda', 2),

  ('expense', -20.50, '2024-02-20', 1, 'KFC', 3),
  ('expense', -50.00, '2024-02-22', 8, 'Heating Bill', 3),
  ('income', 1500.00, '2024-02-25', 4, 'Monthly salary', 3),
  ('expense', -800.00, '2024-02-28', 6, 'Lava Lamp', 3),

  ('expense', -10.50, '2024-02-20', 1, 'Roehampton Diner', 4),
  ('expense', -2500.00, '2024-02-22', 9, 'Tuition Fee Installment', 4),
  ('income', 1500.00, '2024-02-25', 4, 'Monthly salary', 4),
  ('expense', -1.00, '2024-02-28', 7, 'Pen', 4),
  
  ('expense', -4, '2024-01-20', 1, 'Greggs', 1),
  ('expense', -54.00, '2024-01-22', 7, 'Tesco', 2),
  ('income', 5500.00, '2024-01-25', 4, 'Royalties', 3),
  ('expense', -800.00, '2024-01-20', 5, 'Kids Supplies - Crayons', 4),

  ('expense', -15.50, '2024-03-19', 1, 'Hotel Breakfast', 4),
  ('expense', -50.00, '2024-03-22', 2, 'Petrol', 3),
  ('expense', -1500.00, '2024-03-21', 6, 'New Television', 2),
  ('expense', -120.00, '2024-03-20', 6, 'Nike Shoes', 1),

  ('expense', -25.00, '2024-03-23', 6, 'Shirt from Primark', 4);
  