DROP DATABASE IF EXISTS reviewsapi;

CREATE DATABASE reviewsapi;

USE reviewsapi;

CREATE TABLE reviewer (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  reviewer_name varchar(50) NOT NULL
);

CREATE TABLE products (
  product_id INT NOT NULL PRIMARY KEY
);

CREATE TABLE reviews (
  review_id int NOT NULL PRIMARY KEY,
  product_id int NOT NULL,
  rating int NOT NULL,
  date DATE NOT NULL,
  summary varchar(255),
  body varchar(255) NOT NULL,
  recommend boolean DEFAULT 0,
  reported boolean DEFAULT 0,
  reviewer_id INT NOT NULL,
  reviewer_email varchar(100) NOT NULL,
  response varchar(255),
  helpfulness INT DEFAULT 0,
  FOREIGN KEY (reviewer_id) REFERENCES reviewer(id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE photos (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  fromReview int not null,
  url varchar(255),
  FOREIGN KEY (fromReview) REFERENCES reviews(review_id)
);

CREATE TABLE characteristics_products (
  characteristic_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  characteristic_name varchar(50) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);


CREATE TABLE characteristics_and_reviews (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  characteristic_id INT NOT NULL,
  review_id INT NOT NULL,
  score INT NOT NULL,
  FOREIGN KEY (review_id) REFERENCES reviews(review_id),
  FOREIGN KEY (characteristic_id) REFERENCES characteristics_products(characteristic_id)
);