select 
transportid,
transportphotoreference,
tripid,
transportname,
transportrating
from 
transportation
inner join trips on trips.id = transportation.tripid
where tripid = $1