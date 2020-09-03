"use strict";

var express = require('express'),
    bodyParser = require('body-parser'),
    uuid = require('uuid'); // Adding Mongoose to project  


var mongoose = require('mongoose');

var Models = require('./models.js');

var Movies = Models.Movie;
var Users = Models.User;
mongoose.connect('mongodb://localhost:27017/myflixdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('Connected to database');
})["catch"](function (err) {
  return console.err('Could not connect to MongoDB...');
});
var app = express();

var morgan = require('morgan');

app.use(bodyParser.json());
app.use(morgan('common'));
app.use(express["static"]('public'));
app.get('/documentation', function (req, res) {
  res.sendFile('public/documentation.html');
});
app.get('/movies', function (req, res) {
  Movies.find().then(function (movies) {
    res.json(movies);
  });
});
app.get('/movies/data', function (req, res) {
  res.send('This is the information for all the movies you selected.');
}); // Adds data for a new student to our list of students.

app.post('/movies/users', function (req, res) {
  var newMovie = req.body;

  if (!newMovie.name) {
    var message = 'Missing movie name in request body';
    res.status(400).send(message);
  } else {
    newMovie.id = uuid.v4();
    movies.push(newMovie);
    res.status(201).send(newMovie);
  }
});
app.get('/movies/users', function (req, res) {
  res.send('Welcome to your account.');
});
app.listen(8080, function () {
  return console.log('Your app is listening on port 8080.');
});
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});