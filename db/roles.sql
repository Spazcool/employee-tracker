USE cms_db;

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(department_id),
    PRIMARY KEY (id)
)

-- INSERT INTO roles (title, salary, department_id)
-- VALUES 
--     ("Marketing Dude", 12.50, 1),
--     ("Development Dudette", 50.7, 2),
--     ("Customer Relations Squire", 8.1, 3),
--     ("Sales Maestro", 2.344, 4);