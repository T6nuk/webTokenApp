const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const mainRoutes = require('./routes/mainRoute');

mongoose.connect('mongodb://localhost:27017/jwtokenDB', 
    {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(mainRoutes)

//route to send cookies
app.get('/send-cookie', (req, res)=>{
    //register a cookie in a browser
    res.setHeader('Set-Cookie', 'newCookie=true');

    res.cookie('newCookie', false);
    res.cookie('tempCookie', true, {maxAge: 1000*60*60, httpOnly: true});
    res.send('You got the cookie');
});

//get the COOKIE
app.get('/get-cookie', (req, res)=>{
    const cookies = req.cookies;
    console.log(cookies);

    const {newCookie} = cookies; //tõmbab välja cookie(objekti) väärtuse tänu {}
    console.log(newCookie);

    res.json(cookies);
})


PORT = 5000;

app.listen(PORT, () => {
    console.log('Server started');
});