SELECT *
FROM Posts
JOIN Users
ON Posts.userid = Users.id;