delete from hotels
where tripid = $1
returning *;