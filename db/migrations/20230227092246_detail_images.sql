-- migrate:up
CREATE TABLE detail_images(
  id INT NOT NULL AUTO_INCREMENT,
  lecture_id INT NOT NULL,
  sequence INT NULL,
  image_url VARCHAR(500) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT detail_images_lecture_id_fkey FOREIGN KEY (lecture_id) REFERENCES lectures(id)
);

-- migrate:down
DROP TABLE detail_images;
