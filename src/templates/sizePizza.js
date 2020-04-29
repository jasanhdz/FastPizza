const { callSendApi } = require('../services/sendApi');

module.exports.sizePizza = (senderId) => {
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
