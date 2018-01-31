select 
amuseid,
amusephotoreference,
tripid,
amusename,
amuserating
from 
amusement
inner join trips on trips.id = amusement.tripid
where tripid = $1