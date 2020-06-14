USE cms_db;

CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(role_id) NOT NULL,
    FOREIGN KEY (manger_id) REFERENCES employees(manager_id),
    PRIMARY KEY (id)
)

-- INSERT INTO employees (first_name, last_name, role_id, manager_id)
-- VALUES 
--     ("Dave","Watkins", 1, 4),
--     ("Susan", "Marks", 2, 3),
--     ("Tucker","Andrews", 3, 2),
--     ("Kimberly","Sinclair", 4, 1);