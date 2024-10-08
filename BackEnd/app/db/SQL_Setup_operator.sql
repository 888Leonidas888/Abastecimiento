/* Setup of the user */
CREATE USER IF NOT EXISTS 'salmon_user'@'localhost' IDENTIFIED BY 'salmon_password';
GRANT ALL PRIVILEGES ON 'Salmon_DB' TO 'salmon_user'@'localhost';
FLUSH PRIVILEGES;

/* Setup of the database */
CREATE DATABASE IF NOT EXISTS Salmon_DB;
USE Salmon_DB;
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(50) PRIMARY KEY NOT NULL UNIQUE,
    batch_id VARCHAR(50),
    sku NUMBER(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    due_time DATE NOT NULL,
    freshness VARCHAR(255) NOT NULL,
    qr_pallet VARCHAR(255) NOT NULL,
    created_at DATE,
    updated_at DATE,
    FOREIGN KEY (batch_id) REFERENCES batch(id),
);

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) NOT NULL PRIMARY KEY UNIQUE,
    dni VARCHAR(8) NOT NULL UNIQUE,
    user VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name_user VARCHAR(255) NOT NULL,
    last_name_user VARCHAR(255) NOT NULL,
    permission VARCHAR(255) NOT NULL,
    created_at DATE,
    updated_at DATE,
);

CREATE TABLE IF NOT EXISTS batches (
    id VARCHAR(50) NOT NULL PRIMARY KEY UNIQUE,
    created_at DATE,
    updated_at DATE,
);

CREATE TABLE IF NOT EXISTS productivity (
    id_user VARCHAR(50),
    id_product VARCHAR(255)
    created_at DATE,
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_product) REFERENCES products(id),
);

