-- migrate:up
CREATE TABLE videos(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(200) NULL,
  time VARCHAR(200) NULL,
  video_url VARCHAR(3000) NULL,
  curriculum_id INT NOT NULL,
  sequence INT NULL,
  PRIMARY KEY (id),
  CONSTRAINT videos_curriculum_id_fkey FOREIGN KEY (curriculum_id) REFERENCES curriculums (id)
);
-- migrate:down
DROP TABLE videos;