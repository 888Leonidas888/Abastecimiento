/* Setup of the user */
CREATE USER IF NOT EXISTS salmon_user_dev@localhost IDENTIFIED BY 'salmon_password_golden';
GRANT ALL PRIVILEGES ON Salmon_DB_dev.* TO salmon_user_dev@localhost;
FLUSH PRIVILEGES;

/* Setup of the database */
CREATE DATABASE IF NOT EXISTS Salmon_DB_dev;
USE Salmon_DB_dev;

CREATE TABLE IF NOT EXISTS batches (
    id VARCHAR(50) NOT NULL PRIMARY KEY UNIQUE,
    created_at DATE,
    updated_at DATE
);

CREATE TABLE IF NOT EXISTS products(
    id VARCHAR(50) PRIMARY KEY NOT NULL UNIQUE,
    batch_id VARCHAR(50),
    sku INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    due_date DATE NOT NULL,
    freshness VARCHAR(255) NOT NULL,
    qr_pallet VARCHAR(255) NOT NULL UNIQUE,
    created_at DATE,
    updated_at DATE,
    FOREIGN KEY (batch_id) REFERENCES batches(id)
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
    updated_at DATE
);

CREATE TABLE IF NOT EXISTS productivity (
    id_user VARCHAR(50) NOT NULL,
    qr_pallet VARCHAR(255) NOT NULL,
    created_at DATE,
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (qr_pallet) REFERENCES products(qr_pallet)
);

