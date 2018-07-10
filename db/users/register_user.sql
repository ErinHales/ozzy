INSERT INTO Users
(first_name, last_name, username, sub, picture)
VALUES ($1,$2,$3,$4,$5)
RETURNING *;