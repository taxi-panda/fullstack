DROP TABLE IF EXISTS routes CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    password_digest VARCHAR NOT NULL
);

CREATE TABLE routes (
    id SERIAL PRIMARY KEY,
    start_lat NUMERIC(10,6) NOT NULL,
    start_lng NUMERIC(10,6) NOT NULL,
    start_addr VARCHAR NOT NULL,
    start_name VARCHAR NOT NULL,
    end_lat NUMERIC(10,6) NOT NULL,
    end_lng NUMERIC(10,6) NOT NULL,
    end_addr VARCHAR NOT NULL,
    end_name VARCHAR NOT NULL,
    price FLOAT(2) NOT NULL,
    start_time TIME NOT NULL,
    users_id INT REFERENCES users(id)
);