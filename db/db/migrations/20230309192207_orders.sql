-- migrate:up
CREATE TABLE orders(
  id INT NOT NULL AUTO_INCREMENT,
  order_number VARCHAR(200),
  user_id INT NOT NULL,
  lecture_id INT NOT NULL,
  payment_types_id INT NOT NULL,
  total_price DECIMAL (10,2),
  create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT orders_lecture_id_fkey FOREIGN KEY (lecture_id) REFERENCES lectures (id),
  CONSTRAINT orders_payment_types_id_fkey FOREIGN KEY (payment_types_id) REFERENCES payment_types (id)
);
-- migrate:down
DROP TABLE orders;