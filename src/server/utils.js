const _ = require('lodash');

function userToJson(user) {
  const safeUser = _.omit(user, ['password_hash']);
  return safeUser;
}

module.exports = { userToJson };
