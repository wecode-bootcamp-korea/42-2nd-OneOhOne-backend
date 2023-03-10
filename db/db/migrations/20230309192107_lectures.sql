-- migrate:up
CREATE TABLE lectures(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  description VARCHAR(3000) NULL,
  main_image_url VARCHAR(500) NULL,
  creator_id INT NOT NULL,
  category_name VARCHAR(100) NULL,
  status_name VARCHAR(100) NULL,
  user_id int NOT NULL,
  create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP NULL ON UPDATE  CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT lectures_creator_id_fkey FOREIGN KEY (creator_id)  REFERENCES creators (id),
  CONSTRAINT lectures_users_id_fkey FOREIGN KEY (user_id) REFERENCES users (id)
);
-- migrate:down
DROP TABLE lectures;