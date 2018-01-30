select 
placeid,
photoreference,
tripid,
name,
rating
from 
shopping
inner join trips on trips.id = shopping.tripid
where tripid = $1