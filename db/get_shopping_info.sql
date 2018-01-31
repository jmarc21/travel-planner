select 
shoppingid,
shoppingphotoreference,
tripid,
shopname,
shoprating
from 
shopping
inner join trips on trips.id = shopping.tripid
where tripid = $1