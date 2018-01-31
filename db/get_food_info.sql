select 
foodid,
foodphotoreference,
tripid,
foodname,
foodrating
from 
food
inner join trips on trips.id = food.tripid
where tripid = $1