-- migrate:up
CREATE TABLE reviews(
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  lecture_id INT NOT NULL,
  description VARCHAR(200) NOT NULL,
  image_url VARCHAR(500) NULL,
  star INT NULL,
  create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id)  REFERENCES users (id),
  CONSTRAINT reviews_lecture_id_fkey FOREIGN KEY (lecture_id) REFERENCES lectures (id)
);
-- migrate:down
DROP TABLE reviews;