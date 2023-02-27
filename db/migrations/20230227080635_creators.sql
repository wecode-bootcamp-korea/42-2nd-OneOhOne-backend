-- migrate:up
CREATE TABLE creators(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  image_url VARCHAR(500) NULL,
  description TEXT NOT NULL,
  PRIMARY KEY(id)
);

-- migrate:down
DROP TABLE creators;

