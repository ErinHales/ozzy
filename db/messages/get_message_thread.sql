SELECT * FROM Messages
WHERE user_id = $1
ORDER BY id;