const express = require('express');
//
const db = require('../db/db');
const { userToJson } = require('../utils');

const router = express.Router();


router.get('/blogs/:id', (req, res) => {
  const blog = db
    .query('SELECT * FROM users WHERE id = $1', [Number(req.params.id)]);

  if (!blog) {
    res.status(404).json({ error: 'Item not found.' });
    return;
  }

  res.json(blog);
});

router.get('/users/:id', (req, res) => {
  const user = db
    .query('SELECT * FROM users WHERE id = $1', [Number(req.params.id)])

  if (!user) {
    res.status(404).json({ error: 'Item not found.' });
    return;
  }

  const safeUser = userToJson(user);
  res.json(safeUser);
});

module.exports = router;

/* eslint no-use-before-define: off */
