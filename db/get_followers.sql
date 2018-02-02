select * from friends as f 
join users as u on u.auth_id = f.userauthid
where friendauthid = $1
order by f.id desc