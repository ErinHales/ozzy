SELECT m.id, m.conversation_id, m.care_provider_id, m.date, m.message, m.user_id, m.messager, c.color, c.user_id FROM Messages m
JOIN Conversation c ON m.conversation_id = c.id
WHERE m.care_provider_id = $1
ORDER BY m.id DESC;