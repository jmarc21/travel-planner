INSERT INTO trips 
(TripName, userId, username)
values
($1, $2, $3)
RETURNING *;