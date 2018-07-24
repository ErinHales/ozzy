CREATE TABLE Messages (
id SERIAL PRIMARY KEY,
conversation_id INTEGER,
user_id INTEGER,
color VARCHAR(20),
date VARCHAR(40),
message VARCHAR(120),
messager_id INTEGER,
messager VARCHAR(40)
);