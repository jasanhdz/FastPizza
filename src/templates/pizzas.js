const { callSendApi } = require('../services/sendApi');

module.exports.showPizzas = (senderId) => {
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
