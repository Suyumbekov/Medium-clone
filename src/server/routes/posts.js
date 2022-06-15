const express = require('express');
const sanitizeHtml = require('sanitize-html');
const db = require('../db');

const router = express.Router();

router.get('/:id', async (req, res) => {
 db
    .query('SELECT * FROM posts WHERE id = $1', [Number(req.params.id)])
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

router.get('/', (req, res) => {
  db
    .query('SELECT * FROM posts')
    .then((resp) => {
      if(!resp.rows[0]){
        res.status(404).json({ error: 'Item not found.' });
      }
      res.json(resp.rows);
    })
    .catch(() => {
      res.status(404).json({ error: 'Item not found.' });
    });
});

router.post('/', (req, res) => {
  const data = req.body;
  data.content_markup = sanitizeHtml(data.content_markup, {
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
    },
  });
  db
    .query(`INSERT INTO posts(blog_id, user_id, title, subtitle, content_markup, is_large_preview, img_descriptor, date, read_time_estimate) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [data.blog_id, data.user_id, data.title, data.subtitle, data.content_markup, data.is_large_preview, data.img_descriptor, data.date, data.read_time_estimate])
    .then(() => res.send('Post created successfully!'))
    .catch(() => {
      res.status(404).json({ error: 'Item not found.' });
    });
});

router.patch('/:id', async (req, res) => {
  // console.log(req.body);
  const postChanges = req.body.content_markup;
  sanitizedPost = sanitizeHtml(postChanges, {
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
    },
  });

  db
  .query('UPDATE posts SET title = $1, subtitle = $2, content_markup=$3 WHERE id = $4 RETURNING id', [req.body.title, req.body.subtitle, sanitizedPost, Number(req.params.id)])
  .then((resp) => {
    console.log(resp.rows[0]);
    if(!resp.rows[0]){
      res.status(404).json({ error: 'Item not found.' });
      return;
    }
    res.json({ success: 'Post successfully modified.'});
    
  })
  .catch(() => {
    res.status(404).json({ error: 'Item not found.' });
  });
});

module.exports = router;
