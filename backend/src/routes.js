const { Router } = require('express');

const UserController = require('./controllers/UserController');
const CommentController = require('./controllers/CommentController');

const routes = Router();

routes.get('/teste', (request, response) => {
  return response.json({ msg: 'tudo certo' })
});

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/users/:user_id/comments', CommentController.index);
routes.post('/users/:user_id/comments', CommentController.store);


module.exports = routes;