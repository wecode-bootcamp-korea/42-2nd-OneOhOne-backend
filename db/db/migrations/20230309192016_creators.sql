-- migrate:up
CREATE TABLE creators(
  id INT NOT NULL AUTO_INCREMENT,
  nickname VARCHAR(300) NULL,
  image_url VARCHAR(500) NULL,
  description TEXT NULL,
  PRIMARY KEY(id)
);
-- migrate:down
DROP TABLE creators;