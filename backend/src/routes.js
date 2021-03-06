const { Router } = require('express');

const UserController = require('./controllers/UserController');
const CommentController = require('./controllers/CommentController');
const WatsonController = require('./controllers/WatsonController');

const routes = Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/users/:user_id/comments', CommentController.index);
routes.post('/users/:user_id/comments', CommentController.store);
routes.delete('/users/:user_id/comments/:comment_id', CommentController.destroy);

routes.post('/synthesize', WatsonController.store);

module.exports = routes;