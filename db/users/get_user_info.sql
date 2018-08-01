SELECT u.id, u.first_name, u.last_name, u.picture, p.status, p.seeking_childcare, p.newsfeed FROM Users u
JOIN ParentInfo p ON u.id = p.userid
WHERE u.id = $1;