const { callSendApi } = require('../services/sendApi');

module.exports.getLocation = (senderId) => {
  const messageData = {
    recipient: {
      id: senderId,
    },
    message: {
      text: 'Ahora ¿Puedes proporcionarnos tu ubicación?',
      quick_replies: [
        {
          content_type: 'location',
        },
      ],
    },
  };
  callSendApi(messageData);
};
