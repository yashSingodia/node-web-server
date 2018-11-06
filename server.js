const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;



hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use((req,res,next ) =>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    console.log(log );
    fs.appendFile('server.log', log+'\n', (err) => {
        if(err)
            console.log('Unable to append to server.log.');
    });
    next();
});

app.set('view engine', 'hbs');

app.use(express.static(__dirname+'/public'));

app.get('/', (req,res) => {
    // res.send('<h1>Hello Express!<h1>');
    // res.send({
    //     name: 'Yash',
    //     likes: [
    //         'Development',
    //         'Karate'
    //     ]
    // });
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcome: 'Hey There, Welcome.'
    });

});

app.get('/about', (req,res) => {
    //res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/projects', (req,res) => {
    res.render('projects.hbs',{
        pageTitle: 'Projects'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});