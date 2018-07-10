UPDATE LikePost
SET loved = $3
WHERE postid = $1 AND userid = $2
RETURNING *;