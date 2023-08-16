const express = require('express')
const app = express();
const session = require('express-session');

// session middleware setup
const sessionConfig = {
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}

app.use(session(sessionConfig));
// first time when you visit the page you get a set-cookie method in the response object.
// and then every time you make a request to the server the brwser will send the cookie with the request object and along whci the express-server will check

app.get('/', (req, res) => {
    res.send("welcome to the home page");
});

app.get('/login', (req, res) => {
    // Set session data
    req.session.username = 'example_user';
    req.session.count=req.session.count?++req.session.count:1;
    res.send('Login successful!');
});

app.get('/profile', (req, res) => {
    // Access session data
    const username = req.session.username;
    const count= req.session.count?req.session.count:1;
    res.send(`Welcome, ${username}!
            You have visited the page ${    count} times.`);
});

app.listen(8000, () => {
    console.log("app running at http://localhost:8000 ");
})