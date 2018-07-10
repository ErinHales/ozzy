UPDATE LikePost
SET loved = $2
WHERE postid = $1
RETURNING *;