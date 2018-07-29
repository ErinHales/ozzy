SELECT m.id, m.care_provider_id, m.date, m.message, m.user_id, m.messager, c.color, c.user_id FROM Messages m
JOIN Conversation c ON m.care_provider_id = c.care_provider
WHERE m.care_provider_id = $2 AND m.user_id = $1
ORDER BY m.id DESC;