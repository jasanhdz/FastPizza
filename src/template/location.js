const getLocation = (senderId, callback) => {
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
  callback(messageData);
};

module.exports = {
  getLocation,
};
