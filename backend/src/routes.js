const { Router } = require('express');

const routes = Router();

routes.get('/teste', (request, response) => {
  return response.json({ msg: 'tudo certo' })
});

module.exports = routes;