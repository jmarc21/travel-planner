require('dotenv').config();
const express = require('express')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , cors = require('cors')
    , axios = require('axios');

const { AUTH_DOMAIN, AUTH_CLIENT_ID, AUTH_CLIENT_SECRET, AUTH_CALLBACK_URL, CONNECTION_STRING } = process.env

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

massive(CONNECTION_STRING).then( (db) => {
    app.set('db',db);
})

passport.use(new Auth0Strategy({
    domain: AUTH_DOMAIN,
    clientID: AUTH_CLIENT_ID,
    clientSecret: AUTH_CLIENT_SECRET,
    callbackURL: AUTH_CALLBACK_URL,
    scope: 'openid profile'
}, function(accessToken, refreshToken, extraParams, profile, done){
    console.log(accessToken)
    let { displayName, user_id, picture} = profile;
    const db = app.get('db')

    db.find_user([user_id]).then(function(users){
        console.log(users)
        if(!users[0]){
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
    .then(function(user){
        return done(null, user[0]);
    })
})

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/feed',
    failureRedirect: 'http://localhost:3000/#/'
}))

app.get('/auth/me', (req,res) => {
    if(!req.user) {
        res.status(404).send('User not found.');
    }else{
        res.status(200).send(req.user);
    }
})

app.get('/auth/logout', function(req,res){
    req.logOut();
    res.redirect('http://localhost:3000/#/')
})
app.post('/hotels', (req,res) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Number(req.body.Lat)},${Number(req.body.Lng)}&radius=50000&type=lodging&key=${process.env.GOOGLE_API}`)
    .then(resp => {
        res.status(200).send(resp.data.results)
    })
})
app.post('/airports', (req,res) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Number(req.body.Lat)},${Number(req.body.Lng)}&radius=50000&type=airport&key=${process.env.GOOGLE_API}`)
    .then(resp => {
        res.status(200).send(resp.data.results)
    })
})
app.post('/restaurants', (req,res) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Number(req.body.Lat)},${Number(req.body.Lng)}&radius=50000&type=restaurant&key=${process.env.GOOGLE_API}`)
    .then(resp => {
        res.status(200).send(resp.data.results)
    })
})
app.post('/hotel-detail', (req,res) => {
    console.log(req.body.place_id)
    axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${req.body.place_id}&key=${process.env.GOOGLE_API}`)
    .then(resp => {
        // console.log(resp)
        res.status(200).send(resp.data)
    })
})
app.post('/get-pic', (req,res) => {
    console.log(req.body)
    axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${req.body.pic}&key=${process.env.GOOGLE_API}`)
    .then(resp => {
        console.log(resp.request.res.responseUrl)
        res.status(200).send(resp.request.res.responseUrl)
    })
})


const { SERVER_PORT } = process.env
app.listen(SERVER_PORT, () => {
    console.log(`I'm listening on port: ${SERVER_PORT}`)
});