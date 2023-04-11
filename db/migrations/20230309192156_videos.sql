-- migrate:up
CREATE TABLE videos(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(200),
  time VARCHAR(200),
  video_url VARCHAR(3000),
  curriculum_id INT,
  sequence INT,
  PRIMARY KEY (id),
  CONSTRAINT videos_curriculum_id_fkey FOREIGN KEY (curriculum_id) REFERENCES curriculums (id)
);
-- migrate:down
DROP TABLE videos;