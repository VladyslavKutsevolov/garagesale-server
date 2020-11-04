insert into users
  (username, first_name, last_name, email, phone, password)
values
  ('tester', 'Inga', 'McIlenna', 'tester@test.com', '12042938913', 'tester');
insert into users
  (username, first_name, last_name, email, phone, password)
values
  ('jaeyoung', 'jaeyoung', 'kim', 'garajiji@hotmail.com', '12042938913', 'password');
  insert into users
  (username, first_name, last_name, email, phone, password)
values
  ('vlad', 'vlad', 'Kutsevolov', 'garajiji@garajiji.com', '12042938913', 'tester');
insert into users
  (username, first_name, last_name, email, phone, password)
values
  ('james', 'james', 'brown', 'james@garajiji.com', '12042938913', 'tester');
insert into users
  (username, first_name, last_name, email, phone, password)
values
  ('admin', 'Admin', 'Master', 'admin@garagesale.com', '12042938913', '1245');
insert into users
  (username, first_name, last_name, email, phone, password)
values
  ('eprout3', 'Effie', 'Prout', 'eprout3@ezinearticles.com', '1429394293', 'MvgAaVbFC');
insert into users
  (username, first_name, last_name, email, phone, password)
values
  ('asymon4', 'Almeda', 'Symon', 'asymon4@vinaora.com', '18001001004', 'OgPJMA4Phi');

insert into garage_sales
  (seller_id, title, cover_photo_url, description, city, province, created_at)
values
  (1, 'One Dollar Garage', 'https://garagesale-jaeyoung.s3.amazonaws.com/product-images/1604444084030-money.gif', 'Everything is $1!!! VERY VERY CHEAP!!! YOU MUST COME!!!', 'Vancouver', 'British Columbia', '2020-10-27 08:14:22');
insert into garage_sales
  (seller_id, title, cover_photo_url, description, city, province, created_at)
values
  (2, 'Jae Garage', 'https://image.freepik.com/free-vector/garage-sale-background_1365-40.jpg', 'Big sale before moving', 'Winnipeg', 'Manitoba', '2020-09-09 14:08:48');
insert into garage_sales
  (seller_id, title, cover_photo_url, description, city, province, created_at)
values
  (3, 'One Day Sale', 'https://thumbs.dreamstime.com/z/garage-sale-16863161.jpg', 'Only sale one day!!! COME ASAP!!!!', 'Vancouver', 'British Columbia', '2020-10-30 08:14:22');
insert into garage_sales
  (seller_id, title, cover_photo_url, description, city, province, created_at)
values
  (4, 'Late Halloween Sale', 'https://thumbs.dreamstime.com/z/time-halloween-sale-sale-advertisement-pumpkin-halloween-theme-clean-design-halloween-pumpkin-happy-sale-design-116411801.jpg', 'Time to Prepare upcoming halloween in next year.', 'Vancouver', 'British Columbia', '2020-10-31 08:14:22');
  insert into garage_sales
  (seller_id, title, cover_photo_url, description, city, province, created_at)
values
  (5, 'Happy Garage', 'https://thumbs.dreamstime.com/z/garage-sale-cute-banner-household-items-background-eps-40672201.jpg', 'Come and enjoy my garage sale', 'Calgary', 'Alberta', '2020-09-01 08:14:22');




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
  (1, 'Airpots', 'Airpot1 10mins of playtime after fully charged', 'https://images-na.ssl-images-amazon.com/images/I/71zny7BTRlL._AC_SL1500_.jpg', 1.00, false, 1, 2),
  (2, 'Rainbow Cloth package', 'You can be rainbow.', 'https://cdn1.expertreviews.co.uk/sites/expertreviews/files/2019/08/best_online_clothes_shops.jpg', 77, false, 2, 9),
  (2, 'Teddy Bear', 'Happy Mr.TeddyBear.', 'https://thumbs.dreamstime.com/z/toy-bear-29092432.jpg', 11.75, true, 2, 6),
  (1, 'Apple Wired Keyboard', 'Apple wired keyboard without wire.', 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Apple_Keyboard_with_Numeric_Keyboard_9612.jpg', 1.00, false, 1, 2),
  (1, 'Nike Shoe', 'Never wear. Size = 1',
    'https://www.pngjoy.com/pngm/53/1199732_nike-shoe-men-s-nike-zoom-fly-flyknit.png', 1.00, false, 1, 4),
  (2, 'Bike', 'I cannot ride it during winter time.', 'https://www.superebikes.ca/wp-content/uploads/2020/03/e-wild-s-black-2-560x560.jpg', 111.44, true, 2, 11),
  (1, 'Motorola Phone', 'It is foldable.', 'https://images.theconversation.com/files/107896/original/image-20160112-6996-1jahuzf.JPG?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop', 1.00, false, 1, 2),
  (2, 'Wine glasses', 'Only glasses, not wine!', 'https://thumbs.dreamstime.com/z/wine-glass-15320271.jpg', 14.22, false, 2, 11),
  (2, 'Toy CyberTruck', 'Toy BMW for kids.', 'https://www.tesla.com/xNVh4yUEc3B9/04_Desktop.jpg', 200.75, false, 2, 6),
  (3, 'Motorola Phone', 'Never Used, It is foldable!', 'https://images.theconversation.com/files/107896/original/image-20160112-6996-1jahuzf.JPG?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop', 100.0, false, 3, 2),
  (3, 'Toy CyberTruck', 'Toy version of cybertruck from tesla', 'https://www.tesla.com/xNVh4yUEc3B9/04_Desktop.jpg', 57.22, false, 3, 6),
  (1, 'Smart TV', 'Not turning on. For decoration purpose only', 'https://thumbs.dreamstime.com/z/television-monitor-texture-sky-isolated-white-background-54339475.jpg', 1.00, false, 1, 2),
  (4, 'Scary RIP Skeleton', 'Decorate your yard with scary tombs', 'https://thumbs.dreamstime.com/z/halloween-decoration-green-lawn-46238098.jpg', 20.05, false, 4, 11),
  (4, 'Halloween Pumpkin Lamp', 'Halloween Spooky Lamp', 'https://thumbs.dreamstime.com/z/halloween-21654340.jpg', 3.05, false, 4, 11),
  (4, 'Halloween Table with Skeleton', 'Amazing outdoor table with handsome skeleton gentleman', 'https://thumbs.dreamstime.com/z/halloween-skeleton-decoration-garden-funny-sitting-table-60102020.jpg', 133.05, false, 4, 2);






