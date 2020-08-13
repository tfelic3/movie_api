const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

const morgan = require('morgan');

app.use(bodyParser.json());

app.use(morgan('common'));
app.use(express.static('public'))


let movies= 
[
    {name: "Trigun",
genre: "Anime",
director: "Shigeru Kitayama"},

{name: "Outlaw Star",
genre: "Anime",
director:"Takehiko Ito"},
{name: "Mobile Suit Gundam Wing",
genre: "Anime",
director: " Yoshiyuki Tomino"}
];


  
  app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html');
  });
    
  app.get('/movies', (req, res) => {
    res.json(movies);
  });

  app.get('/movies/data', (req, res) => {
    res.send('This is the information for all the movies you selected.');
  });
  
  // Adds data for a new student to our list of students.
app.post('/movies/users', (req, res) => {
    let newMovie = req.body;
  
    if (!newMovie.name) {
      const message = 'Missing movie name in request body';
      res.status(400).send(message);
    } else {
      newMovie.id = uuid.v4();
      movies.push(newMovie);
      res.status(201).send(newMovie);
    }
  });

  app.get('/movies/users', (req, res) => {
    res.send('Welcome to your account.');
  });


  app.listen(8080, () =>
    console.log('Your app is listening on port 8080.')
  );

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });