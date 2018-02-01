UPDATE users
SET img = $1, username = $2, description = $3
where auth_id = $4