select 
placeid,
photoreference,
tripid,
name,
rating
from 
food
inner join trips on trips.id = food.tripid
where tripid = $1