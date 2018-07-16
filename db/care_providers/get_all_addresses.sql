SELECT a.care_provider_id, a.address_1, a.address_2, a.city, a.state, a.zip, c.name, c.status, c.short_bio, c.long_bio, c.image, c.stars FROM Address a
JOIN CareProvider c
ON a.care_provider_id = c.id;