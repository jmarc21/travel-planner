select 
placeid,
photoreference,
tripid,
name,
rating
from 
hotels
inner join trips on trips.id = hotels.tripid
where tripid = $1