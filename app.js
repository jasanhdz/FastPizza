'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { defaultMessage } = require('./src/messages/defaultMessage');
const { messageImage } = require('./src/messages/messageImage');
const { contactSupport } = require('./src/templates/contactSupport');
const { getLocation } = require('./src/templates/location');
const { showPizzas } = require('./src/templates/pizzas');
const { sizePizza } = require('./src/templates/sizePizza');
const { receipt } = require('./src/templates/receipt');
const { showLocations } = require('./src/templates/showlocations');

const app = express();

app.set('port', process.env.PORT || 5000);
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
    getLocation(senderId);
  } else if (event.attachments) {
    handleAttachments(senderId, event);
  }
};

const handlePostback = (senderId, { payload }) => {
  console.log(payload);
  switch (payload) {
    case 'GET_STARTED_FASTPIZZA':
      return console.log('entro al GET_STARTED_FASTPIZZA');
    case 'PIZZAS_PAYLOAD':
      return showPizzas(senderId);
    case 'PEPPERONI_PAYLOAD':
      return sizePizza(senderId);
    case 'CHICKEN_BBQ_PAYLOAD':
      return sizePizza(senderId);
    case 'HAWAIANA_PAYLOAD':
      return sizePizza(senderId);
  }
};

const handleAttachments = (senderId, event) => {
  console.log(event.attachments[0]);
  let attachment_type = event.attachments[0].type;
  switch (attachment_type) {
    case 'image':
      return console.log(attachment_type);
    case 'video':
      return console.log(attachment_type);
    case 'audio':
      return console.log(attachment_type);
    case 'file':
      return console.log(attachment_type);
  }
};

app.listen(app.get('port'), () =>
  console.log(
    `La aplicación esta corriendo en http://localhost:${app.get('port')}`
  )
);
