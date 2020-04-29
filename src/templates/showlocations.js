const { callSendApi } = require('../services/sendApi');
module.exports.showLocations = (senderId, callback) => {
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
