const request = require('request');
const access_token =
  'EAADZAh8wMPEkBAMsYD7kaiCoeo3pp11kDOQkNePRvMzBno1vFGMVThYrJ5TylZBSsCdUa4K94VeKoZBhmdFjL6BI0e6quitZAtNPovsG4q2xVrafhrSbEKxdByE7jUsQnjzVAYWucdONZC8ydjpnkqkRwQam4RL9RHwnnzBNJ3gZDZD';

module.exports.callSendApi = (response) => {
  request({
    uri: 'https://graph.facebook.com/me/messages/',
    qs: {
      access_token,
    },
    method: 'POST',
    json: response,
  }),
    function (err) {
      if (err) {
        console.log('Ha ocurrido un error');
      } else {
        console.log('Mensaje enviado');
      }
    };
};
