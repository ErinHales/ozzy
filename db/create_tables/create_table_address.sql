CREATE TABLE Address (
id SERIAL PRIMARY KEY,
care_provider_id INTEGER,
address_1 VARCHAR(40),
address_2 VARCHAR(40),
city VARCHAR(40),
state VARCHAR(40),
zip VARCHAR(5)
);