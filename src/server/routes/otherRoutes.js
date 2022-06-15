const express = require('express');
//
const db = require('../db');
const { userToJson } = require('../utils');

const router = express.Router();


router.get('/blogs/:id', (req, res) => {
  db
    .query('SELECT * FROM blogs WHERE id = $1', [Number(req.params.id)])
    .then((resp) => {
      if(!resp.rows[0]){
        res.status(404).json({ error: 'Item not found.' });
      }
      res.json(resp.rows[0]);
    })
    .catch(() => {
      res.status(404).json({ error: 'Item not found.' });
    });
});

router.get('/users/:id', (req, res) => {
  db
    .query('SELECT * FROM users WHERE id = $1', [Number(req.params.id)])
    .then((resp) => {
      if(!resp.rows[0]){
        res.status(404).json({ error: 'Item not found.' });
      }
      const safeUser = userToJson(resp.rows[0]);
      res.json(safeUser);
    })
    .catch(() => {
      res.status(404).json({ error: 'Item not found.' });
    });
});

module.exports = router;

/* eslint no-use-before-define: off */
