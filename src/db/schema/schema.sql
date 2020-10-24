DROP TABLE IF EXISTS garage_sales CASCADE;

CREATE TABLE garage_sales (
  id SERIAL PRIMARY KEY NOT NULL,
  seller_id INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  cover_photo_url VARCHAR(255),
  createdAt DATE NOT NULL,
  location_id INTEGER NOT NULL
);