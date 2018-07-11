CREATE TABLE Posts (
 id SERIAL PRIMARY KEY, 
 userid INTEGER, 
 date VARCHAR(40), 
 post VARCHAR(2000), 
 status VARCHAR(80),
 image VARCHAR(500)
);