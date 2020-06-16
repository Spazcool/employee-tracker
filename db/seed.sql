-- DROP DATABASE IF EXISTS cms_db;

-- CREATE DATABASE cms_db;

-- USE cms_db;

-- //////////////  TABLES /////////////////
-- CREATE TABLE departments(
--     id INT NOT NULL AUTO_INCREMENT,
--     name VARCHAR(30) NOT NULL,
--     PRIMARY KEY (id)
-- )

-- CREATE TABLE roles(
--     id INT NOT NULL AUTO_INCREMENT,
--     title VARCHAR(30) NOT NULL,
--     salary DECIMAL NOT NULL,
--     department_id INT,
--     FOREIGN KEY (department_id) REFERENCES departments(id),
--     PRIMARY KEY (id)
-- )

-- CREATE TABLE employees(
--     id INT NOT NULL AUTO_INCREMENT,
--     first_name VARCHAR(30) NOT NULL,
--     last_name VARCHAR(30) NOT NULL,
--     role_id INT,
--     manager_id INT,
--     FOREIGN KEY (role_id) REFERENCES roles(id),
--     FOREIGN KEY (manager_id) REFERENCES employees(id),
--     PRIMARY KEY (id)
-- )

-- //////////////  VALUES /////////////////
-- INSERT INTO departments (name)
-- VALUES 
--     ("Marketing"),
--     ("Development"),
--     ("Customer Relations"),
--     ("Sales");

-- INSERT INTO roles (title, salary, department_id)
-- VALUES 
--     ("Manager", 12.50, 1),
--     ("Intern", 50.7, 2),
--     ("Engineer", 8.1, 3),
--     ("Sales Maestro", 2.34, 4);

-- //////////////  MANAGER /////////////////
-- INSERT INTO employees (first_name, last_name, role_id)
-- VALUES 
--     ("Dave","Watkins", 1);

-- //////////////  REGULAR BUMS  /////////////////
-- INSERT INTO employees (first_name, last_name, role_id, manager_id)
-- VALUES
--     ("Susan", "Marks", 2, 5),
--     ("Tucker","Andrews", 3, 5),
-- 	   ("Kimberly","Sinclair" , 4, 5);

