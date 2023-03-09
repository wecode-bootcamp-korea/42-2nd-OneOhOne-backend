-- migrate:up
ALTER TABLE detail_images MODIFY COLUMN image_url VARCHAR(500) NUll

-- migrate:down

