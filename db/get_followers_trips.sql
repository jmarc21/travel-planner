select * from users as u
join friends as f on u.auth_id = f.userauthid
join trips as t on t.userid = f.friendauthid
join hotels as h on h.tripid = t.id
join transportation as tr on tr.tripid = t.id
join amusement as a on a.tripid = t.id
join shopping as s on s.tripid = t.id
join food as fo on fo.tripid = t.id
where u.auth_id = $1
order by t.id desc