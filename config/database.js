const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL ||'postgres://' + process.env.USER + '@localhost:5432/hackathon');

module.exports = db;