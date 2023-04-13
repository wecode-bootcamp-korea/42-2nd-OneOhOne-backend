-- migrate:up
ALTER TABLE users ADD COLUMN creator_id INT AFTER point;
ALTER TABLE users ADD CONSTRAINT fk_creators FOREIGN KEY (creator_id) REFERENCES users(id);

-- migrate:down
ALTER TABLE users DROP COLUMN creator_id;
ALTER TABLE users DROP FOREIGN KEY fk_creators;