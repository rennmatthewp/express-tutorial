const express = require('express');
const app = express();
const users = require('./data.json');

app.listen(3000, () => {
  console.log('Express intro running on localhost:3000');
});

app.use(express.static('public'));

const urlLogger = (request, response, next) => {
  console.log('Request URL:', request.url);
  next();
};

const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString());
  next();
};

app.use(urlLogger, timeLogger);

app.get('/', (request, response) => {});

app.get('/json', (request, response) => {
  response.status(200).json(users);
});

app.get('/sunsets', (request, response) => {
  response.sendFile(__dirname + '/public/sunsets.html');
});

app.use((request, response, next) => {
  response.status(404).sendFile(__dirname + '/public/404.html');
});
