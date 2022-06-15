const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: 'root',
    database: 'blog',
    host: 'localhost',
    port: 5432
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })

module.exports = pool;
