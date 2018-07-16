SELECT u.id, u.first_name, u.last_name, u.picture, p.status, p.seeking_childcare, p.newsfeed, f.name, f.image, f.relationship, f.id as family_id FROM Users u
JOIN ParentInfo p ON u.id = p.userid
JOIN Family f ON u.id = f.userid
WHERE u.id = $1;