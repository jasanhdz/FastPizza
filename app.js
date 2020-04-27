'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.set('port', 5000);
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World Jasan!');
});

app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === 'fastpizza_token') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Fast Pizza no tienes permisos');
  }
});

app.post('/webhook', (req, res) => {
  const webhook_event = req.body.entry[0];
  if (webhook_event.messaging) {
    webhook_event.messaging.forEach((event) => {
      console.log(event);
    });
  }
  res.sendStatus(200);
});

app.listen(app.get('port'), () =>
  console.log(
    `La aplicación esta corriendo en http://localhost:${app.get('port')}`
  )
);
