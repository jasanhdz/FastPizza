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
  }
};

const senderActions = (senderId) => {
  const messageData = {
    recipient: {
      id: senderId,
    },
    sender_action: 'typing_on',
  };
  callSendApi(messageData);
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

const defaultMessage = (senderId) => {
  const messageData = {
    recipient: {
      id: senderId,
    },
    message: {
      text: 'Hola, soy un bot de messenger y te invito a utilizar nuestro menú',
      quick_replies: [
        {
          content_type: 'text',
          title: '¿Quieres una Pizza?',
          payload: 'PIZZAS_PAYLOAD',
        },
        {
          content_type: 'text',
          title: 'Acerca de',
          payload: 'ABOUT_PAYLOAD',
        },
      ],
    },
  };
  senderActions(senderId);
  callSendApi(messageData);
};

const showPizzas = (senderId) => {
  const messageData = {
    recipient: {
      id: senderId,
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [
            {
              title: 'Pepperoni',
              subtitle: 'Con todo el sabor del peperoni',
              image_url:
                'https://olodominos.blob.core.windows.net/dev/webOptimized/especialidad/PES/PES.png',
              buttons: [
                {
                  type: 'postback',
                  title: 'Elegir Pepperoni',
                  payload: 'PEPPERONI_PAYLOAD',
                },
              ],
            },
            {
              title: 'Pollo BBQ',
              subtitle: 'Con todo el sabor del BBQ',
              image_url:
                'https://olodominos.blob.core.windows.net/dev/webOptimized/especialidad/CHIHNC/CHIHNC.png',
              buttons: [
                {
                  type: 'postback',
                  title: 'Elegir Pollo BBQ',
                  payload: 'CHICKEN_BBQ_PAYLOAD',
                },
              ],
            },
            {
              title: 'Hawaiana',
              subtitle: 'Con todo el sabor de la piña',
              image_url:
                'https://olodominos.blob.core.windows.net/dev/webOptimized/especialidad/HNC/HNC.png',
              buttons: [
                {
                  type: 'postback',
                  title: 'Elegir Hawaiana',
                  payload: 'HAWAIANA_PAYLOAD',
                },
              ],
            },
          ],
        },
      },
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
