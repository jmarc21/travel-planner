require('dotenv').config();
const express = require('express')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , cors = require('cors')
    , axios = require('axios')
    , createInitialSession = require('./session');

const { AUTH_DOMAIN, AUTH_CLIENT_ID, AUTH_CLIENT_SECRET, AUTH_CALLBACK_URL, CONNECTION_STRING } = process.env

const app = express();
app.use(cors());
app.use(bodyParser.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: {maxAge: 43200000}
}))
// app.use(createInitialSession)
app.use(passport.initialize());
app.use(passport.session());

massive(CONNECTION_STRING).then((db) => {
    app.set('db', db);
})

passport.use(new Auth0Strategy({
    domain: AUTH_DOMAIN,
    clientID: AUTH_CLIENT_ID,
    clientSecret: AUTH_CLIENT_SECRET,
    callbackURL: AUTH_CALLBACK_URL,
    scope: 'openid profile'
}, function (accessToken, refreshToken, extraParams, profile, done) {
    let { displayName, user_id, picture } = profile;
    const db = app.get('db')

    db.find_user([user_id]).then(function (users) {
        if (!users[0]) {
            db.create_user([
                displayName,
                picture,
                user_id
            ]).then(user => {
                return done(null, user[0].id)
            })
        } else {
            return done(null, users[0].id)
        }
    })
}))
passport.serializeUser((id, done) => {
    return done(null, id);
})
passport.deserializeUser((id, done) => {
    app.get('db').find_session_user([id])
        .then(function (user) {
            return done(null, user[0]);
        })
})

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: `http://localhost:3000/#/planner`,
    failureRedirect: '/#/'
}))

app.get('/auth/me', (req, res) => {
    if (!req.user) {
        res.status(404).send('User not found.');
    } else {
        res.status(200).send(req.user);
    }
})
app.post('/update-profile', (req,res) => {
    const {profilepic, username, bio, user} = req.body;
    const db = app.get('db');
    db.update_user([
        profilepic,
        username,
        bio,
        user
    ]).then(resp => {
        res.status(200).send(resp)
    })
})
app.post('/create-trip', (req, res) => {
    // console.log(req.body)
    const { tripName, userId, username } = req.body;
    const db = app.get('db');
    db.create_trip([
        tripName,
        userId,
        username
    ]).then(resp => {
        res.status(200).send('Trip added')
    })
})
app.post('/getUserTrips', (req, res) => {
    // const {user_id} = req.user
    // console.log(req.body)
    const db = app.get('db');
    const { auth_id } = req.body;
    db.get_user_trips([
        auth_id
    ]).then(resp => {
        res.status(200).send(resp)
        console.log(resp)
    })
})
app.post('/gettripinfo', (req, res) => {
    console.log(req.body)
    let trip = []
    var count = 0;
    req.body.tripid.map((e, i) => {
        const tripid = { id: e }
        const db = app.get('db');
        var p1 = db.get_hotel_info([
            e
        ]).then(resp => {
            tripid.hotel = resp[0]
            db.get_transportation_info([
                e
            ]).then(resp => {
                tripid.transport = resp[0]
                db.get_amusement_info([
                    e
                ]).then(resp => {
                    tripid.amuse = resp[0]
                    db.get_shopping_info([
                        e
                    ]).then(resp => {
                        tripid.shopping = resp[0]
                        db.get_food_info([
                            e
                        ]).then(resp => {
                            tripid.food = resp[0]
                            db.get_trip_info([
                                e
                            ]).then(resp => {
                                tripid.tripinfo = resp[0]
                                trip.push(tripid)
                                count++
                                if (req.body.tripid.length === count) {
                                    res.status(200).send({ trip })
                                }
                            })
                        })
                    })
                })
            })
        })
    })


})
app.post('/getfollowerstrips', (req, res) => {
    const db = app.get('db');
    console.log(req.body)
    const { id } = req.body;
    db.get_followers_trips([
        id
    ]).then(resp => {
        res.status(200).send(resp)
    })
})
//user trip components
app.post('/hotel-trip-comp', (req, res) => {
    console.log('hotel', req.body)
    const db = app.get('db');
    const { placeId, photoReference, tripId, userId, name, rating } = req.body;
    db.add_to_hotel([
        placeId,
        photoReference,
        tripId,
        userId,
        name,
        rating
    ]).then(resp => {
        res.status(200).send('Hotel added to trip')
    })
})
app.post('/transport-trip-comp', (req, res) => {
    // console.log('trans',req.body)
    const db = app.get('db');
    const { placeId, photoReference, tripId, userId, name, rating } = req.body;
    db.add_to_transport([
        placeId,
        photoReference,
        tripId,
        userId,
        name,
        rating
    ]).then(resp => {
        res.status(200).send('transport added to trip')
    })
})
app.post('/amuse-trip-comp', (req, res) => {
    // console.log('amuse',req.body)
    const db = app.get('db');
    const { placeId, photoReference, tripId, userId, name, rating } = req.body;
    db.add_to_amusement([
        placeId,
        photoReference,
        tripId,
        userId,
        name,
        rating
    ]).then(resp => {
        res.status(200).send('amuesment added to trip')
    })
})
app.post('/food-trip-comp', (req, res) => {
    // console.log('food',req.body)
    const db = app.get('db');
    const { placeId, photoReference, tripId, userId, name, rating } = req.body;
    db.add_to_food([
        placeId,
        photoReference,
        tripId,
        userId,
        name,
        rating
    ]).then(resp => {
        res.status(200).send('food added to trip')
    })
})
app.post('/shop-trip-comp', (req, res) => {
    // console.log('shop',req.body)
    const db = app.get('db');
    const { placeId, photoReference, tripId, userId, name, rating } = req.body;
    db.add_to_shopping([
        placeId,
        photoReference,
        tripId,
        userId,
        name,
        rating
    ]).then(resp => {
        res.status(200).send('shop added to trip')
    })
})
//delete Trips
app.post('/delete-trip' , (req, res) => {
    console.log('delete',req.body)
    const {tripid} = req.body
    const db = app.get('db')
    db.delete_trip([
        tripid
    ]).then(resp => {
        res.status(200).send('deleted')
    })
})
app.post('/delete-hotel', (req,res) => {
    const {hotelid} = req.body;
    const db = app.get('db');
    db.delete_hotel([
        hotelid
    ]).then(resp => {
        res.status(200).send(resp)
    })
})
app.post('/transport-hotel', (req,res) => {
    const {hotelid} = req.body;
    const db = app.get('db');
    db.delete_transport([
        hotelid
    ]).then(resp => {
        res.status(200).send(resp)
    })
})
app.post('/amuse-hotel', (req,res) => {
    const {hotelid} = req.body;
    const db = app.get('db');
    db.delete_amuse([
        hotelid
    ]).then(resp => {
        res.status(200).send(resp)
    })
})
app.post('/shop-hotel', (req,res) => {
    const {hotelid} = req.body;
    const db = app.get('db');
    db.delete_shop([
        hotelid
    ]).then(resp => {
        res.status(200).send(resp)
    })
})
app.post('/food-hotel', (req,res) => {
    const {hotelid} = req.body;
    const db = app.get('db');
    db.delete_food([
        hotelid
    ]).then(resp => {
        res.status(200).send(resp)
    })
})
//user trip components info
app.post('/get-hotel-info', (req, res) => {
    const db = app.get('db');
    const { tripid } = req.body
    db.get_hotel_info([
        tripid
    ]).then(resp => {
        res.status(200).send(resp)
    })
})
app.post('/get-transport-info', (req, res) => {
    const db = app.get('db');
    const { tripid } = req.body
    db.get_transportation_info([
        tripid
    ]).then(resp => {
        res.status(200).send(resp)
    })
})
app.post('/get-amusement-info', (req, res) => {
    const db = app.get('db');
    const { tripid } = req.body
    db.get_amusement_info([
        tripid
    ]).then(resp => {
        res.status(200).send(resp)
    })
})
app.post('/get-shopping-info', (req, res) => {
    const db = app.get('db');
    const { tripid } = req.body
    db.get_shopping_info([
        tripid
    ]).then(resp => {
        res.status(200).send(resp)
    })
})
app.post('/get-food-info', (req, res) => {
    const db = app.get('db');
    const { tripid } = req.body
    db.get_food_info([
        tripid
    ]).then(resp => {
        res.status(200).send(resp)
    })
})
app.get('/auth/logout', function (req, res) {
    req.logOut();
    res.redirect('/#/')
    // res.redirect('https://justindemarco.auth0.com/v2/logout')
})
//user friends
app.post('/add-friend', (req, res) => {
    const db = app.get('db');
    const userauthId = req.body.user.auth_id;
    const friendUsername = req.body.friend.username;
    const friendAuthId = req.body.friend.auth_id;
    const friendImg = req.body.friend.img;
    db.add_to_friends([
        userauthId,
        friendUsername,
        friendAuthId,
        friendImg
    ]).then(resp => {
        res.status(200).send('friend added')
    })
})
app.post('/unfollow', (req,res) => {
    console.log('id', req.body)
    const {id} = req.body
    const db = app.get('db');
    db.unfollow([
        id
    ]).then(resp => {
        res.status(200).send('unfollowed')
    })
})
app.post('/numOfFollowing', (req, res) => {
    console.log('asdfads', req.body)
    const { auth_id } = req.body;
    const db = app.get('db');
    db.get_num_of_friends([
        auth_id
    ]).then(resp => {
        res.status(200).send(resp)
    })
})
app.post('/numOfFollowers', (req, res) => {
    console.log('asdfads', req.body)
    const { auth_id } = req.body;
    const db = app.get('db');
    db.get_num_of_followers([
        auth_id
    ]).then(resp => {
        res.status(200).send(resp)
    })
})
app.post('/get-following', (req,res) => {
    console.log('following',req.body)
    const {authid} = req.body;
    const db = app.get('db');
    db.get_following([
        authid
    ]).then(resp => {
        res.status(200).send(resp)
    })
})
app.post('/get-followers', (req,res) => {
    console.log('followers',req.body)
    const {authid} = req.body;
    const db = app.get('db')
    db.get_followers([
        authid
    ]).then( resp => {
        res.status(200).send(resp)
    })
})
app.get('/get-users', (req, res) => {
    const db = app.get('db');
    db.get_users().then(resp => {
        res.status(200).send(resp)
    })
})
//map pin location requests
app.post('/hotels', (req, res) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Number(req.body.Lat)},${Number(req.body.Lng)}&radius=50000&type=lodging&key=${process.env.REACT_APP_GOOGLE_API}`)
        .then(resp => {
            // console.log(resp)
            res.status(200).send(resp.data.results)
        })
})
app.post('/airports', (req, res) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Number(req.body.Lat)},${Number(req.body.Lng)}&radius=50000&type=airport&key=${process.env.REACT_APP_GOOGLE_API}`)
        .then(resp => {
            res.status(200).send(resp.data.results)
        })
})
app.post('/restaurants', (req, res) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Number(req.body.Lat)},${Number(req.body.Lng)}&radius=50000&type=restaurant&key=${process.env.REACT_APP_GOOGLE_API}`)
        .then(resp => {
            res.status(200).send(resp.data.results)
        })
})
app.post('/car-rental', (req, res) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Number(req.body.Lat)},${Number(req.body.Lng)}&radius=50000&type=car_rental&key=${process.env.REACT_APP_GOOGLE_API}`)
        .then(resp => {
            res.status(200).send(resp.data.results)
        })
})
app.post('/amusement-park', (req, res) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Number(req.body.Lat)},${Number(req.body.Lng)}&radius=50000&type=amusement_park&key=${process.env.REACT_APP_GOOGLE_API}`)
        .then(resp => {
            res.status(200).send(resp.data.results)
        })
})
app.post('/museum', (req, res) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Number(req.body.Lat)},${Number(req.body.Lng)}&radius=50000&type=museum&key=${process.env.REACT_APP_GOOGLE_API}`)
        .then(resp => {
            res.status(200).send(resp.data.results)
        })
})
app.post('/aquarium', (req, res) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Number(req.body.Lat)},${Number(req.body.Lng)}&radius=50000&type=aquarium&key=${process.env.REACT_APP_GOOGLE_API}`)
        .then(resp => {
            res.status(200).send(resp.data.results)
        })
})
app.post('/bakery', (req, res) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Number(req.body.Lat)},${Number(req.body.Lng)}&radius=50000&type=bakery&key=${process.env.REACT_APP_GOOGLE_API}`)
        .then(resp => {
            res.status(200).send(resp.data.results)
        })
})
app.post('/night-club', (req, res) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Number(req.body.Lat)},${Number(req.body.Lng)}&radius=50000&type=night_club&key=${process.env.REACT_APP_GOOGLE_API}`)
        .then(resp => {
            res.status(200).send(resp.data.results)
        })
})
app.post('/spa', (req, res) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Number(req.body.Lat)},${Number(req.body.Lng)}&radius=50000&type=spa&key=${process.env.REACT_APP_GOOGLE_API}`)
        .then(resp => {
            res.status(200).send(resp.data.results)
        })
})
app.post('/liquor-store', (req, res) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Number(req.body.Lat)},${Number(req.body.Lng)}&radius=50000&type=liquir_store&key=${process.env.REACT_APP_GOOGLE_API}`)
        .then(resp => {
            res.status(200).send(resp.data.results)
        })
})
app.post('/bowling-alley', (req, res) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Number(req.body.Lat)},${Number(req.body.Lng)}&radius=50000&type=bowling_alley&key=${process.env.REACT_APP_GOOGLE_API}`)
        .then(resp => {
            res.status(200).send(resp.data.results)
        })
})
app.post('/cafe', (req, res) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Number(req.body.Lat)},${Number(req.body.Lng)}&radius=50000&type=cafe&key=${process.env.REACT_APP_GOOGLE_API}`)
        .then(resp => {
            res.status(200).send(resp.data.results)
        })
})
app.post('/casino', (req, res) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Number(req.body.Lat)},${Number(req.body.Lng)}&radius=50000&type=casino&key=${process.env.REACT_APP_GOOGLE_API}`)
        .then(resp => {
            res.status(200).send(resp.data.results)
        })
})
app.post('/clothing-store', (req, res) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Number(req.body.Lat)},${Number(req.body.Lng)}&radius=50000&type=clothing_store&key=${process.env.REACT_APP_GOOGLE_API}`)
        .then(resp => {
            res.status(200).send(resp.data.results)
        })
})
app.post('/department-store', (req, res) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Number(req.body.Lat)},${Number(req.body.Lng)}&radius=50000&type=department_store&key=${process.env.REACT_APP_GOOGLE_API}`)
        .then(resp => {
            res.status(200).send(resp.data.results)
        })
})
app.post('/shoe-store', (req, res) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Number(req.body.Lat)},${Number(req.body.Lng)}&radius=50000&type=shoe_store&key=${process.env.REACT_APP_GOOGLE_API}`)
        .then(resp => {
            res.status(200).send(resp.data.results)
        })
})
app.post('/shopping-mall', (req, res) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Number(req.body.Lat)},${Number(req.body.Lng)}&radius=50000&type=shopping_mall&key=${process.env.REACT_APP_GOOGLE_API}`)
        .then(resp => {
            res.status(200).send(resp.data.results)
        })
})
app.post('/supermarket', (req, res) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Number(req.body.Lat)},${Number(req.body.Lng)}&radius=50000&type=supermarket&key=${process.env.REACT_APP_GOOGLE_API}`)
        .then(resp => {
            res.status(200).send(resp.data.results)
        })
})
app.post('/detail', (req, res) => {
    // console.log(req.body.place_id)
    axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${req.body.place_id}&key=${process.env.REACT_APP_GOOGLE_API}`)
        .then(resp => {
            // console.log(resp)
            res.status(200).send(resp.data)
        })
})
app.post('/detail-pic', (req, res) => {
    console.log(req.body.photo_reference)
    axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${req.body.photo_reference}&key=${process.env.REACT_APP_GOOGLE_API}`)
        .then(resp => {
            res.status(200).send(resp.request.res.responseUrl)
        })
})

app.use( express.static( `${__dirname}/../build` ) );

const { SERVER_PORT } = process.env
app.listen(SERVER_PORT, () => {
    console.log(`I'm listening on port: ${SERVER_PORT}`)
});