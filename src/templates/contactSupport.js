const { callSendApi } = require('../services/sendApi');

module.exports.contactSupport = (senderId) => {
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
