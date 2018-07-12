CREATE TABLE ParentInfo (
id SERIAL PRIMARY KEY,
userid INTEGER,
status VARCHAR(40),
seeking_childcare BOOLEAN,
newsfeed TEXT
);