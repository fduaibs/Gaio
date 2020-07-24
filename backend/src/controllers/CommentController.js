const User = require('../models/User');
const Comment = require('../models/Comment');
const { destroy } = require('../models/User');

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;
    const user = await User.findByPk(user_id, {
      include: { association: 'comments' },
    });

    if(!user) {
      return res.status(400).json({ error: 'user not found' });
    }

    res.json(user.comments);
  },
  async store(req, res) {
    const { user_id } = req.params;
    const { text } = req.body;

    const user = await User.findByPk(user_id);

    if(!user) {
      return res.status(400).json({ error: 'user not found' });
    }

    const comment = await Comment.create({ 
      text,
      user_id
    });

    return res.json(comment); 
  },
  async destroy(req, res) {
    const { user_id, comment_id } = req.params;

    const user = await User.findByPk(user_id);
    if(!user) {
      return res.status(400).json({ error: 'user not found' });
    }

    const comment = await Comment.findByPk(comment_id);
    if(!comment) {
      return res.status(400).json({ error: 'comment not found' });
    }

    const deletedCount = await Comment.destroy({ 
      where: {
        id: comment_id,
      }
    });
    if(!deletedCount) {
      return res.status(400).json({ error: 'could not delete comment' });
    }
    return res.json(deletedCount);
  }
};