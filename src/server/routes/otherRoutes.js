const express = require('express');
const _ = require('lodash');
//
const db = require('../db');

const router = express.Router();

router.get('/blogs/:id', (req, res) => {
  const blog = db
    .get('blogs')
    .find({ id: Number(req.params.id) })
    .value();

  if (!blog) {
    res.status(404).json({ error: 'Item not found.' });
    return;
  }

  res.json(blog);
});

router.get('/users/:id', (req, res) => {
  const user = db
    .get('users')
    .find({ id: Number(req.params.id) })
    .value();

  if (!user) {
    res.status(404).json({ error: 'Item not found.' });
    return;
  }

  const safeUser = userToJson(user);
  res.json(safeUser);
});

function userToJson(user) {
  const safeUser = _.omit(user, ['password']);
  return safeUser;
}

module.exports = router;

/* eslint no-use-before-define: off */
