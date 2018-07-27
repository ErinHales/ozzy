SELECT * FROM Messages
WHERE user_id = $1 AND care_provider_id = $2
ORDER BY id DESC
LIMIT 1;