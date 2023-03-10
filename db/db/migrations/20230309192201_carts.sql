-- migrate:up
CREATE TABLE carts(
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  lecture_id INT NOT NULL,
  create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT cart_lecture_id_fkey FOREIGN KEY (lecture_id) REFERENCES lectures (id),
  CONSTRAINT cart_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id)
);
-- migrate:down
DROP TABLE carts;