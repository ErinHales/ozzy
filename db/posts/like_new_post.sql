INSERT INTO LikePost
(postid, liked, loved, userid)
VALUES ($1, $2, $3, $4)
RETURNING *;