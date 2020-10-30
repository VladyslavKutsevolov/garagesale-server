insert into users
  (username, first_name, last_name, email, phone, password)
values
  ('tester', 'Inga', 'McIlenna', 'tester@test.com', '12042938913', 'tester');
insert into users
  (username, first_name, last_name, email, phone, password)
values
  ('jaeyoung', 'jaeyoung', 'kim', 'youngs_89@hotmail.com', '12042938913','password');
insert into users
  (username, first_name, last_name, email, phone, password)
values
  ('admin', 'Admin', 'Master', 'admin@garagesale.com', '12042938913','admin1');
insert into users
  (username, first_name, last_name, email, phone, password)
values
  ('eprout3', 'Effie', 'Prout', 'eprout3@ezinearticles.com', '1429394293','MvgAaVbFC');
insert into users
  (username, first_name, last_name, email, phone, password)
values
  ('asymon4', 'Almeda', 'Symon', 'asymon4@vinaora.com', '18001001004','OgPJMA4Phi');

insert into garage_sales
  (seller_id, title, cover_photo_url, description, city, province, created_at)
values
  (1, 'Test_Big_Sale', 'https://source.unsplash.com/200x200?sig=2', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 'Calgary', 'Alberta', '2019-11-25 08:14:22');
insert into garage_sales
  (seller_id, title, cover_photo_url, description, city, province, created_at)
values
  (2, 'Jae Garage', 'https://source.unsplash.com/200x200?sig=3', 'Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros.', 'Winnipeg', 'Manitoba', '2020-03-09 14:08:48');
insert into garage_sales
  (seller_id, title, cover_photo_url, description, city, province, created_at)
values
  (3, 'One Day Van', 'https://source.unsplash.com/200x200?sig=4', 'Only Sale today', 'Calgary', 'Alberta', '2019-11-25 08:14:22');
insert into garage_sales
  (seller_id, title, cover_photo_url, description, city, province, created_at)
values
  (4, 'Happy Garage', 'https://source.unsplash.com/200x200?sig=5', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 'Vancouver', 'British Columbia', '2019-11-25 08:14:22');

insert into products (title, description, image_url, price, sold, sale_id) values ('AirPods', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus.', 'https://source.unsplash.com/200x200?sig=12', 1087, false, 2);
insert into products (title, description, image_url, price, sold, sale_id) values ('MacBook', 'Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 'https://source.unsplash.com/200x200?sig=13', 852, false, 3);
insert into products (title, description, image_url, price, sold, sale_id) values ('Boa, emerald green tree', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 'https://source.unsplash.com/200x200?sig=14', 492, true, 2);
insert into products (title, description, image_url, price, sold, sale_id) values ('Roe deer', 'Duis at velit eu est congue elementum.', 'https://source.unsplash.com/200x200?sig=6', 1129, false, 1);
insert into products (title, description, image_url, price, sold, sale_id) values ('Kongoni', 'In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt.', 'https://source.unsplash.com/200x200?sig=7', 1486, false, 4);
insert into products (title, description, image_url, price, sold, sale_id) values ('GalaxyNote 10', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.', 'https://source.unsplash.com/200x200?sig=19', 823, true, 2);
insert into products (title, description, image_url, price, sold, sale_id) values ('Grouse, greater sage', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 'https://source.unsplash.com/200x200?sig=21', 21, false, 2);
insert into products (title, description, image_url, price, sold, sale_id) values ('Book: Harry Poter', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.', 'https://source.unsplash.com/200x200?sig=22', 595, false, 1);
insert into products (title, description, image_url, price, sold, sale_id) values ('Cormorant, neotropic', 'Aliquam non mauris. Morbi non lectus.', 'https://source.unsplash.com/200x200?sig=23', 1246, true, 2);
insert into products (title, description, image_url, price, sold, sale_id) values ('Cape wild cat', 'In sagittis dui vel nisl.', 'https://source.unsplash.com/200x200?sig=31', 1049, false, 2);
insert into products (title, description, image_url, price, sold, sale_id) values ('X-Box', 'Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.', 'https://source.unsplash.com/200x200?sig=41', 1760, false, 3);
insert into products (title, description, image_url, price, sold, sale_id) values ('PlayStation 4', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.', 'https://source.unsplash.com/200x200?sig=33', 1176, false, 1);
insert into products (title, description, image_url, price, sold, sale_id) values ('Skinny Blue Jean', 'Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros.', 'http://placeimg.com/150/150/nature', 468, false, 3);
insert into products (title, description, image_url, price, sold, sale_id) values ('Lego', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', 'http://placeimg.com/150/150/nature', 543, false, 1);
insert into products (title, description, image_url, price, sold, sale_id) values ('Nike Shoe', 'Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue.', 'http://placeimg.com/150/150/nature', 164, false, 1);

insert into categories
  (name)
values
  ('Electronic');
insert into categories
  (name)
values
  ('Furniture');
insert into categories
  (name)
values
  ('Apparel');
insert into categories
  (name)
values
  ('Book');
insert into categories
  (name)
values
  ('Toy');

insert into product_categories
  (product_id, category_id)
values
  (1, 1);
insert into product_categories
  (product_id, category_id)
values
  (2, 1);
insert into product_categories
  (product_id, category_id)
values
  (5, 1);
insert into product_categories
  (product_id, category_id)
values
  (6, 3);
insert into product_categories
  (product_id, category_id)
values
  (7, 2);
insert into product_categories
  (product_id, category_id)
values
  (8, 4);
insert into product_categories
  (product_id, category_id)
values
  (10, 5);
