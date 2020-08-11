const express = require('express');
morgan = require('morgan');

const app = express();

app.use(morgan('common'));
app.use(express.static('public'))


app.get('/', (req, res) => {
 let html =  `<body><p>Welcome! Please select your movie.</p></body>`;
   res.send(html);
  });
  
  app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html');
  });
    
  app.get('/secreturl', (req, res) => {
    res.send('This is a secret url with super top-secret content.');
  });
  
  
  app.listen(8080, () =>
    console.log('Your app is listening on port 8080.')
  );

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });