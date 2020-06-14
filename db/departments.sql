USE cms_db;

CREATE TABLE departments(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
)

-- INSERT INTO departments (name)
-- VALUES 
--     ("Marketing"),
--     ("Development"),
--     ("Customer Relations"),
--     ("Sales");