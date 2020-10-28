DROP TABLE IF EXISTS users
CASCADE;
DROP TABLE IF EXISTS messages
CASCADE;
DROP TABLE IF EXISTS garage_sales
CASCADE;
DROP TABLE IF EXISTS products
CASCADE;
DROP TABLE IF EXISTS categories
CASCADE;
DROP TABLE IF EXISTS product_categories
CASCADE;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE comments
(
  id SERIAL PRIMARY KEY NOT NULL,
  author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL,
  comment_text text NOT NULL,
);

CREATE TABLE garage_sales
(
  id SERIAL PRIMARY KEY NOT NULL,
  seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  cover_photo_url TEXT,
  city VARCHAR(255) NOT NULL,
  province VARCHAR(50),
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE products
(
  id SERIAL PRIMARY KEY NOT NULL,
  seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  price VARCHAR(255),
  sold Boolean not NULL default false,
  sale_id INTEGER REFERENCES garage_sales(id) ON DELETE CASCADE
);

CREATE TABLE categories
(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE product_categories
(
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);