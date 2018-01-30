CREATE TABLE friends(
    id SERIAL PRIMARY KEY,
    userAuthId TEXT,
    friendUsername VARCHAR(240),
    friendAuthId TEXT,
    friendImg TEXT
)