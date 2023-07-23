CREATE TABLE registerUser (
    id int AUTO_INCREMENT,
    email varchar(255),
    username varchar(255),
    pwd varchar(1000),
  
    PRIMARY KEY (ID)

);

CREATE TABLE profile (
    id int AUTO_INCREMENT,
    user_id int,
    firstname varchar(255),
    lastname varchar(255),
    address varchar(255),
    PRIMARY KEY (ID)

);

select id, email, username from registerUser join profile on registerUser.id = profile.user_id


CREATE TABLE post (
	post_id int,
  title varchar(50),
  body varchar(10000),
  created_when timestamp
  
);

select post_id from post join profile on post.post_id = profile.user_id

