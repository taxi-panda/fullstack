const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL 
    // || 'postgres://sabrina@localhost:5432/meal-planning'
);

module.exports = db;