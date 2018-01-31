select 
hotelid,
hotelphotoreference,
tripid,
hotelname,
hotelrating
from 
hotels
inner join trips on trips.id = hotels.tripid
where tripid = $1