DROP TABLE IF EXISTS users
CASCADE;
DROP TABLE IF EXISTS garage_sales
CASCADE;
DROP TABLE IF EXISTS products
CASCADE;
DROP TABLE IF EXISTS categories
CASCADE;
DROP TABLE IF EXISTS comments
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

CREATE TABLE categories
(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
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
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  sale_id INTEGER REFERENCES garage_sales(id) ON DELETE CASCADE
);


CREATE TABLE comments
(
  id SERIAL PRIMARY KEY NOT NULL,
  author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  comment_text TEXT NOT NULL
);

insert into users
  (username, first_name, last_name, email, phone, password)
values
  ('tester', 'Inga', 'McIlenna', 'tester@test.com', '12042938913', 'tester');
insert into users
  (username, first_name, last_name, email, phone, password)
values
  ('jaeyoung', 'jaeyoung', 'kim', 'youngs_89@hotmail.com', '12042938913', 'password');
insert into users
  (username, first_name, last_name, email, phone, password)
values
  ('admin', 'Admin', 'Master', 'admin@garagesale.com', '12042938913', '1245');

insert into garage_sales
  (seller_id, title, cover_photo_url, description, city, province, created_at)
values
  (1, 'Test_Big_Sale', 'https://thumbs.dreamstime.com/z/garage-sale-9110189.jpg', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 'Calgary', 'Alberta', '2019-11-25 08:14:22');
insert into garage_sales
  (seller_id, title, cover_photo_url, description, city, province, created_at)
values
  (2, 'Jae Garage', 'https://image.freepik.com/free-vector/garage-sale-background_1365-40.jpg', 'Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros.', 'Calgary', 'Alberta', '2020-03-09 14:08:48');

insert into categories
  (name)
values
  ('All'),
  ('Electronics'),
  ('Furniture'),
  ('Apparels'),
  ('Books'),
  ('Toys'),
  ('Media'),
  ('Appliances'),
  ('Clothes'),
  ('Tools'),
  ('Others');

insert into products
  (seller_id, title, description, image_url, price, sold, sale_id, category_id)
values
  (1, 'MacBook', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem.', 'https://images-na.ssl-images-amazon.com/images/I/71zny7BTRlL._AC_SL1500_.jpg', 1600.24, false, 1, 2),
  (2, 'Airpods', 'Pellentesque at nulla. Suspendisse potenti.', 'https://cdn1.expertreviews.co.uk/sites/expertreviews/files/2019/08/best_online_clothes_shops.jpg', 58.3, false, 2, 2),
  (2, 'GalaxyNote10', 'Duis at velit eu est congue elementum.', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp13touch-space-select-202005
?wid=892&hei=820&&qlt=80&.v=1587460552755', 251.75, true, 2, 3),
  (1, 'Ostrich - Prime Cut', 'Integer ac leo.', 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Apple_Keyboard_with_Numeric_Keyboard_9612.jpg', 22.63, false, 1, 5),
  (1, 'Apple - Custard', 'Descrption',
    'https://www.pngjoy.com/pngm/53/1199732_nike-shoe-men-s-nike-zoom-fly-flyknit.png', 14.33, false, 1, 2),
  (2, 'Wine - Cahors Ac 2000, Clos', 'Morbi ut odio.', 'https://www.superebikes.ca/wp-content/uploads/2020/03/e-wild-s-black-2-560x560.jpg', 11.44, true, 2, 6),
  (1, 'Lid - Translucent, 3.5 And 6 Oz', 'Etiam faucibus cursus urna. Ut tellus.', 'https://images.theconversation.com/files/107896/original/image-20160112-6996-1jahuzf.JPG?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop', 64.0, false, 1, 8),
  (2, 'Wine - Zinfandel Rosenblum', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.', 'https://www.tesla.com/xNVh4yUEc3B9/04_Desktop.jpg', 57.22, false, 2, 10),
  (1, 'Toy Hulk', 'Maecenas pulvinar lobortis est. Phasellus sit amet erat.', 'https://www.tesla.com/xNVh4yUEc3B9/04_Desktop.jpg', 20.75, false, 1, 6)