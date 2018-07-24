INSERT INTO Messages 
(conversation_id, care_provider_id, date, message, messager_id, messager)
VALUES ($1, $2, $3, $4, $5, $6);