const { callSendApi } = require('../services/sendApi');
module.exports.messageImage = (senderId) => {
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
