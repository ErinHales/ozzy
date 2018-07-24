SELECT c.id, c.care_provider, cp.name, cp.image FROM Conversation c
JOIN CareProvider cp ON cp.id = c.care_provider
WHERE c.user_id = $1;