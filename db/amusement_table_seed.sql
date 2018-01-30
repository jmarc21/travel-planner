CREATE TABLE amusement(
    id SERIAL PRIMARY KEY,
    placeId varchar(240),
    photoReference varchar(240),
    tripId int,
    userId varchar(240)
)