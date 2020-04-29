const { senderActions } = require('./senderActions');
const { callSendApi } = require('../services/sendApi');

module.exports.defaultMessage = (senderId) => {
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
