CREATE TABLE CareProvider (
id SERIAL PRIMARY KEY,
name VARCHAR(40),
status VARCHAR(80),
short_bio VARCHAR(200),
long_bio VARCHAR(1000),
image VARCHAR(300),
stars FLOAT
);