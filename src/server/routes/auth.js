const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
//
const db = require('../db');
const config = require('../config');
const authorize = require('../middlewares/authorize');
//
const { userToJson } = require('../utils');

const router = express.Router();

router.post('/register', async (req, res) => {
  const reqBody = { ...req.body };
  _.forOwn(reqBody, (value) => {
    if (typeof value !== 'string') { throw new Error('Unexpected data type.'); }
  });
  reqBody.username = reqBody.username ? reqBody.username.trim() : reqBody.username;

  const validationResult = await validateRegistrationData(reqBody);
  if (!validationResult.isValid) {
    res.status(400).json({ error: validationResult.error });
    return;
  }

  const newUser = await createNewUser(reqBody.username, reqBody.password);

  const token = jwt.sign({
    id: newUser.id,
  }, config.jwtSecret, { expiresIn: '30d' });

  res.json({
    user: userToJson(newUser),
    token,
  });
});

router.post('/login', async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ error: 'Username and password should be provided.' });
    return;
  }

  const user = await db
    .query('SELECT * FROM users WHERE username = $1', [req.body.username])
    .then(resp => resp.rows[0] );

  if (!user) {
    res.status(404).json({ error: 'User not found. Check the username.' });
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password_hash);
  if (!isPasswordCorrect) {
    res.status(400).json({ error: 'Password is wrong.' });
    return;
  }

  const token = jwt.sign({
    id: user.id,
  }, config.jwtSecret, { expiresIn: '30d' });

  res.json({
    user: userToJson(user),
    token,
  });
});

router.post('/logout', authorize, async(req, res) => {
  // due to authorize middleware, assume that token exists and correct
  const token = req.headers.authorization.slice('Bearer '.length);

  const existingToken = await db
    .query('SELECT id FROM revoked_tokens WHERE token = $1', [token])
    .then(resp => resp.rows[0]);

  if (!existingToken) {
    db
      .query('INSERT INTO revoked_tokens(token) VALUES($1) RETURNING id', [token])
      .then((resp) => {
        if(resp.rows[0])
          res.json({ message: 'Token is revoked.' });
      });
  }
  // TODO: create job (monthly) for cleaning up expired revoked tokens from db
});

// ===========================================================================
// helpers

async function validateRegistrationData(data) {
  if (!data.username || !data.password || !data.confirmPassword) {
    return { isValid: false, error: 'All fields are required.' };
  }

  if (data.username.length < 3) {
    return { isValid: false, error: 'Username should be at least 3 symbols long.' };
  }

  if (data.password.length < 6) {
    return { isValid: false, error: 'Password should be at least 6 symbols long.' };
  }

  if (data.password !== data.confirmPassword) {
    return { isValid: false, error: 'Password and confirmation do not match.' };
  }
  return await db
    .query('SELECT id FROM users WHERE username = $1', [data.username])
    .then((res) => {
      if(res.rows[0]){
        return { isValid: false, error: 'This username is already taken.' };
      }
      return { isValid: true, error: null };
    })

}

async function createNewUser(username, password) {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const result = db
    .query('INSERT INTO users(username, password_hash, avatar_url) VALUES ($1, $2, $3) RETURNING *', [username, passwordHash, 'https://cdn-images-1.medium.com/fit/c/120/120/0*cmAOkoH29zoIVIBT'])
    .then((resp) => {
      return resp.rows[0];
    })
    return result;
}

module.exports = router;
