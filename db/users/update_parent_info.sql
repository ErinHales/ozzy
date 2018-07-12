UPDATE ParentInfo
SET status = $2, seeking_childcare = $3, newsfeed = $4
WHERE userid = $1;