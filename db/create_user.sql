INSERT INTO users 
(username, img, auth_id)
VALUES
($1, $2, $3)
RETURNING *;