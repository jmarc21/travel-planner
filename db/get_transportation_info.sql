select 
placeid,
photoreference,
tripid,
name,
rating
from 
transportation
inner join trips on trips.id = transportation.tripid
where tripid = $1