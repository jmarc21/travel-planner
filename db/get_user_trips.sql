select
tripname,
userId,
trips.id
from 
trips 
inner join users on users.auth_id  = trips.userid
where users.auth_id = $1