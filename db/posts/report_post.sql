UPDATE Posts
SET reported = $2
WHERE id = $1;

SELECT * FROM Posts
WHERE reported = true;