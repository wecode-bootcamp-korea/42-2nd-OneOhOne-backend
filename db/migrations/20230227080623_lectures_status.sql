-- migrate:up
CREATE TABLE lecutre_status(
  id INT NOT NULL AUTO_INCREMENT,
  status VARCHAR(100) NOT NULL,
  PRIMARY KEY(id)
);

-- migrate:down
DROP TABLE lecutre_status;

