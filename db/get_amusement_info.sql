select 
placeid,
photoreference,
tripid,
name,
rating
from 
amusement
inner join trips on trips.id = amusement.tripid
where tripid = $1