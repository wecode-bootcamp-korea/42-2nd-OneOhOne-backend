-- migrate:up
 ALTER TABLE users MODIFY COLUMN password VARCHAR(100) NULL
-- migrate:down
 
 DROP TABLE users 
