import { Sequelize } from 'sequelize';

const db = new Sequelize('codelib_paginate_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;
