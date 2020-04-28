'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const access_token =
  'EAADZAh8wMPEkBAMsYD7kaiCoeo3pp11kDOQkNePRvMzBno1vFGMVThYrJ5TylZBSsCdUa4K94VeKoZBhmdFjL6BI0e6quitZAtNPovsG4q2xVrafhrSbEKxdByE7jUsQnjzVAYWucdONZC8ydjpnkqkRwQam4RL9RHwnnzBNJ3gZDZD';

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
      // console.log(event);
      handleEvent(event.sender.id, event);
    });
  }
  res.sendStatus(200);
});

const handleEvent = (senderId, event) => {
  if (event.message) return handleMessage(senderId, event.message);
  else if (event.postback) return handlePostback(senderId, event.postback);
};

const handleMessage = (senderId, event) => {
  if (event.text) {
    defaultMessage(senderId);
  }
};

const handlePostback = (senderId, { payload }) => {
  switch (payload) {
    case 'GET_STARTED_FASTPIZZA':
      return console.log('entro al GET_STARTED_FASTPIZZA');
  }
};

const defaultMessage = (senderId) => {
  const messageData = {
    recipient: {
      id: senderId,
    },
    message: {
      text: 'Hola, soy un bot de messenger y te invito a utilizar nuestro menú',
    },
  };
  callSendApi(messageData);
};

const callSendApi = (response) => {
  request({
    uri: 'https://graph.facebook.com/me/messages/',
    qs: {
      access_token,
    },
    method: 'POST',
    json: response,
  }),
    function (err) {
      if (err) {
        console.log('Ha ocurrido un error');
      } else {
        console.log('Mensaje enviado');
      }
    };
};

app.listen(app.get('port'), () =>
  console.log(
    `La aplicación esta corriendo en http://localhost:${app.get('port')}`
  )
);
