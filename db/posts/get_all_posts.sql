SELECT Posts.id, Posts.date, Posts.post, Posts.status, Users.first_name, Users.last_name, Users.picture 
FROM Posts
JOIN Users ON Users.id = Posts.userid;