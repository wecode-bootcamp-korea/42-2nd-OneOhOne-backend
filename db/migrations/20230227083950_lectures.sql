-- migrate:up
CREATE TABLE lectures(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description VARCHAR(3000) NULL,
  main_image_url VARCHAR(500) NULL,
  creator_id INT NOT NULL,
  category_id INT NOT NULL,
  status_id INT NOT NULL,
  create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP NULL ON UPDATE  CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT lectures_creator_id_fkey FOREIGN KEY (creator_id)  REFERENCES creators (id),
  CONSTRAINT lectures_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories (id),
  CONSTRAINT lecutres_lecture_status_id_fkey FOREIGN KEY (status_id) REFERENCES lecutre_status (id)
);

-- migrate:down
DROP TABLE lectures;

