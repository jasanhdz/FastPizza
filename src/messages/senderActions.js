const { callSendApi } = require('../services/sendApi');
module.exports.senderActions = (senderId) => {
  const messageData = {
    recipient: {
      id: senderId,
    },
    sender_action: 'typing_on',
  };
  callSendApi(messageData);
};
