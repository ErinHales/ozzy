SELECT Comments.id, Comments.postid, Comments.text, Users.id AS userid, Users.first_name, Users.last_name, Users.username, Users.picture 
FROM Comments 
JOIN Users
ON Comments.userid = Users.id
WHERE postid = $1;