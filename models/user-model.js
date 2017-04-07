const bcrypt = require('bcrypt');
const db = require('../config/database');

const User = {};

// creates a new user
User.create = (user) => {
    // Creates a hashed password
    const password = bcrypt.hashSync(user.password, 10);

    return db.oneOrNone(
        'INSERT INTO users(email, password_digest) VALUES($1, $2) RETURNING *;', 
        [user.email, password]
    );
};

// Finds a user by email
User.findByEmail = (email) => {
    return db.oneOrNone(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
};

module.exports = User;