-- migrate:up
ALTER TABLE lectures MODIFY COLUMN name VARCHAR(200) NUll;
ALTER TABLE lectures MODIFY COLUMN price DECIMAL(10,2) NUll;
ALTER TABLE lectures MODIFY COLUMN category_name VARCHAR(100) NUll;

-- migrate:down

