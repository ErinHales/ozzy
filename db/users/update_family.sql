UPDATE Family
SET image = $2, name = $3, relationship = $4
WHERE id = $1;