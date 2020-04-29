const { callSendApi } = require('../services/sendApi');

module.exports.receipt = (senderId) => {
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
