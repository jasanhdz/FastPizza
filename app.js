'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const access_token =
  'EAADZAh8wMPEkBAMsYD7kaiCoeo3pp11kDOQkNePRvMzBno1vFGMVThYrJ5TylZBSsCdUa4K94VeKoZBhmdFjL6BI0e6quitZAtNPovsG4q2xVrafhrSbEKxdByE7jUsQnjzVAYWucdONZC8ydjpnkqkRwQam4RL9RHwnnzBNJ3gZDZD';
// const { getLocation } = require('./src/template/location');

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

const sizePizza = (senderId) => {
  console.log('elegiste tamaño pizza');
  const messageData = {
    recipient: {
      id: senderId,
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          // top_element_style: 'LARGE',
          elements: [
            {
              title: 'Individual',
              image_url:
                'https://olodominos.blob.core.windows.net/dev/webOptimized/pizzaChef/crust/ORIG.png',
              subtitle: 'Porción inidividual de pizza',
              buttons: [
                {
                  type: 'postback',
                  title: 'Elegir individual',
                  payload: 'PERSONAL_SIZE_PAYLOAD',
                },
              ],
            },
            {
              title: 'Mediana',
              image_url:
                'https://olodominos.blob.core.windows.net/dev/webOptimized/pizzaChef/crust/ORIG.png',
              subtitle: 'Porción Mediana de pizza',
              buttons: [
                {
                  type: 'postback',
                  title: 'Elegir Mediana',
                  payload: 'MEDIUM_SIZE_PAYLOAD',
                },
              ],
            },
            {
              title: 'Grande',
              image_url:
                'https://olodominos.blob.core.windows.net/dev/webOptimized/pizzaChef/crust/ORIG.png',
              subtitle: 'Porción Grande de pizza',
              buttons: [
                {
                  type: 'postback',
                  title: 'Elegir Grande',
                  payload: 'BIG_SIZE_PAYLOAD',
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

const messageImage = (senderId) => {
  const message = {
    recipient: {
      id: senderId,
    },
    message: {
      attachment: {
        type: 'image',
        payload: {
          url: 'https://media.giphy.com/media/1dOIvm5ynwYolB2Xlh/giphy.gif',
        },
      },
    },
  };
  callSendApi(message);
};

const contactSupport = (senderId) => {
  const messageData = {
    recipient: {
      id: senderId,
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: 'Hola este es el canal de soporte, ¿Quieres llamarnos?',
          buttons: [
            {
              type: 'phone_number',
              title: 'Llamar a un asesor',
              payload: '+522224365850',
            },
          ],
        },
      },
    },
  };
  callSendApi(messageData);
};

const showLocations = (senderId) => {
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
              title: 'Sucursal México',
              image_url:
                'https://ntrzacatecas.com/content/uploads/2012/06/dominos-pizza.png',
              subtitle: 'dirección bonita #555',
              buttons: [
                {
                  title: 'Ver en el Mapa',
                  type: 'web_url',
                  url: 'https://goo.gl/maps/GCCpWmZep1t',
                  webview_height_ratio: 'full',
                },
              ],
            },
            {
              title: 'Sucursal Puebla',
              image_url:
                'https://ntrzacatecas.com/content/uploads/2012/06/dominos-pizza.png',
              subtitle: 'dirección muy cerquita #555',
              buttons: [
                {
                  title: 'Ver en el Mapa',
                  type: 'web_url',
                  url: 'https://goo.gl/maps/GCCpWmZep1t',
                  webview_height_ratio: 'tall',
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

const receipt = (senderId) => {
  const messageData = {
    recipient: {
      id: senderId,
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'receipt',
          recipient_name: 'Jasan Hernández',
          order_number: '12345',
          currency: 'MXN',
          payment_method: 'Visa 2345',
          order_url: 'http://petersapparel.parseapp.com/order?order_id=123456',
          timestamp: '1428444852',
          address: {
            street_1: 'Bulevar ruiz cortinez',
            street_2: '',
            city: 'Puebla',
            postal_code: '94025',
            state: 'Puebla',
            country: 'México',
          },
          summary: {
            subtotal: 12.0,
            shipping_cost: 2.0,
            total_tax: 1.0,
            total_cost: 15.0,
          },
          adjustments: [
            {
              name: 'Descuento Frecuente',
              amount: 1.0,
            },
          ],
          elements: [
            {
              title: 'Pizza Pepperoni',
              subtitle: 'La mejor pizza de pepperoni',
              quantity: 1,
              price: 10,
              currency: 'MXN',
              image_url:
                'https://olodominos.blob.core.windows.net/dev/webOptimized/especialidad/PES/PES.png',
            },
            {
              title: 'Bebida',
              subtitle: 'Jugo de Tamarindo',
              quantity: 1,
              price: 2,
              currency: 'MXN',
              image_url:
                'https://olodominos.blob.core.windows.net/dev/webOptimized/especialidad/PES/PES.png',
            },
          ],
        },
      },
    },
  };
  callSendApi(messageData);
};

const getLocation = (senderId) => {
  const messageData = {
    recipient: {
      id: senderId,
    },
    message: {
      text: 'Ahora ¿Puedes proporcionarnos tu ubicación?',
      quick_replies: [
        {
          content_type: 'text',
          title: 'Danos tu ubicación please 🙏',
          payload: 'Lo que sea',
        },
      ],
    },
  };
  callSendApi(messageData);
};

app.listen(app.get('port'), () =>
  console.log(
    `La aplicación esta corriendo en http://localhost:${app.get('port')}`
  )
);
