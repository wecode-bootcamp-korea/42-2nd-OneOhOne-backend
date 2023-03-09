-- migrate:up
ALTER TABLE videos MODIFY name VARCHAR(200) NUll;
ALTER TABLE videos MODIFY video_url VARCHAR(3000) NUll;


-- migrate:down

