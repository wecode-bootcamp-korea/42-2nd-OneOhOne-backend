-- migrate:up
CREATE TABLE videos(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  time VARCHAR(200) NOT NULL,
  video_url VARCHAR(3000) NOT NULL,
  curriculum_id INT NOT NULL,
  sequence INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT videos_curriculum_id_fkey FOREIGN KEY (curriculum_id) REFERENCES curriculums (id)
);

-- migrate:down
DROP TABLE videos;
