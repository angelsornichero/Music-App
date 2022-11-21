const mysql = require('mysql')
const { promisify } = require('util')
const database = {
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'music_app'
}



const pool = mysql.createPool(database);

pool.getConnection ((err, connection) => {
    if (err) throw err;
    if (connection) connection.release(); console.log('Database connected ')
})



pool.query = promisify(pool.query);

module.exports = pool;
