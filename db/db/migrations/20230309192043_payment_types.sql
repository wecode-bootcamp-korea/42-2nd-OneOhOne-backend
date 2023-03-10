-- migrate:up
CREATE TABLE payment_types(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  PRIMARY KEY(id)
);
-- migrate:down
DROP TABLE payment_types;