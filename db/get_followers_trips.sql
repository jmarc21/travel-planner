select * from hotels as h
join transportation as t on t.tripid = h.tripid
join amusement as a on a.tripid = t.tripid
join shopping as s on s.tripid = a.tripid
join food as f on f.tripid = s.tripid
join friends as fr on fr.friendauthid = $1