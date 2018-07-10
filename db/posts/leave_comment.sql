INSERT INTO Comments
(postid, userid, text)
VALUES ($1,$2,$3)
RETURNING *;