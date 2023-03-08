-- migrate:up
CREATE TABLE curriculums(
  id INT NOT NULL AUTO_INCREMENT,
  chapter_name VARCHAR(200) NOT NULL,
  sequence int NULL,
  lecture_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT curriculum_lecture_id_fkey FOREIGN KEY (lecture_id) REFERENCES lectures (id)
);

-- migrate:down
DROP TABLE curriculums;
