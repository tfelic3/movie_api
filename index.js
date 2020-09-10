const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

// Adding Mongoose to project  
const mongoose =require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myflixdb', { useNewUrlParser: true, useUnifiedTopology: true }). then(()=>console.log('Connected to database'))
.catch(err => console.err('Could not connect to MongoDB...'));

const app = express();

//Installing CORS
const cors = require('cors');
app.use(cors());

//CORS implementation
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

//Express Validator
const { check, validationResult } = require('express-validator');




const morgan = require('morgan');

app.use(bodyParser.json());

let auth = require('./auth')(app);

const passport = require('passport');
require('./passport');

app.use(morgan('common'));
app.use(express.static('public'))

  
  app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
  
  });
    
  app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find().then((movies)=>{
res.json(movies);
    });
   
   
  });


app.get('/directors', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find({"Director.Name": "Ryan Coogler"}).then((directors)=>{
res.json(directors);
    });
   

   
  });

  app.get('/movies/genres', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find({"Genre.Name": "Action" }).then((genre)=>{
res.json(genre);
    });
   

   
  });


  // Adds data for a new student to our list of students.


 //Get info about all users
 app.get('/users/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

 //Get a specific user by name 
 app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

   //Allows new users to register
   app.post('/users', [check('Username', 'Username is required').isLength({min: 5}),
   check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
   check('Password', 'Password is required').not().isEmpty(),
   check('Email', 'Email does not appear to be valid').isEmail()
 ], passport.authenticate('jwt', { session: false }), (req, res) => {

  let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
    .then((user) => {
      if (user) {
      //If the user is found, send a response that it already exists
        return res.status(400).send(req.body.Username + ' already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) => { res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});


  //Allow user to update information.
  app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
  });

  //Update movie list
  app.post('/users/:Username/Movies/:MovieID', [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ], passport.authenticate('jwt', { session: false }), (req, res) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    Users.findOneAndUpdate({ Username: req.params.Username }, {
       $push: { FavoriteMovies: req.params.MovieID }
     },
     { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
  });


  //Deleting movie from list
  app.delete('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
       $pull: { FavoriteMovies: req.params.MovieID }
     },
     { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
  });

  //Delete User from list
  app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + ' was not found');
        } else {
          res.status(200).send(req.params.Username + ' was deleted.');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });





  const port = process.env.PORT || 8080;
  app.listen(port, '0.0.0.0',() => {
   console.log('Listening on Port ' + port);
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  })

