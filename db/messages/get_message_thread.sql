SELECT * FROM Messages
WHERE conversation_id = $1
ORDER BY id;