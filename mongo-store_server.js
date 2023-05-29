const express = require('express')
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo'); 


// session middleware setup
const sessionConfig = {
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create( { mongoUrl:'mongodb://localhost:27017/session-data'})
}

app.use(session(sessionConfig));
// first time when you visit the page you get a set-cookie method in the response.
// and then every time you make a request to the server the brwser will send the cookie along whci the express-server will check

app.get('/', (req, res) => {
    req.session.count=req.session.count?++req.session.count:1;
    res.send(`<h3>welcome to the home page.</h3> <br>
    You have visited the page ${req.session.count} times.`);
});

// storing session data, automatically retrieviing user specific data is all done by these packages automatiacally

app.get('/login', (req, res) => {
    // Set session data
    req.session.username = 'Priyanshu';
    req.session.count=req.session.count?++req.session.count:1;
    res.send('Login successful!');
});

app.get('/profile', (req, res) => {
    // Access session data
    const username = req.session.username;
    const count= req.session.count?req.session.count:1;
    res.send(`Welcome, ${username}!`);
});

app.listen(8000, () => {
    console.log("app running at http://localhost:8000 ");
})