SELECT Posts.id, Posts.date, Posts.post, Posts.status, Posts.image, Users.first_name, Users.last_name, Users.picture FROM Posts
JOIN Users ON Users.id = Posts.userid
WHERE status in ($1, $2, $3, $4, $5, $6, $7, $8, $9)
ORDER BY id DESC;