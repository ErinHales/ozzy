UPDATE LikePost
SET liked = $2
WHERE postid = $1
RETURNING *;