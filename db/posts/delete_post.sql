DELETE FROM Posts
WHERE id = $1;

SELECT * FROM Posts
WHERE reported = true;