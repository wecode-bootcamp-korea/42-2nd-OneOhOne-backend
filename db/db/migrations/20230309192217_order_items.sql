-- migrate:up
CREATE TABLE order_items(
  id INT NOT NULL AUTO_INCREMENT,
  order_id INT NOT NULL,
  lecture_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES orders (id),
  CONSTRAINT order_items_lecture_id_fkey FOREIGN KEY (lecture_id) REFERENCES lectures (id)
);
-- migrate:down
DROP TABLE order_items;