import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const User = db.define(
    'users',
    {
        id_user: DataTypes.STRING,
        name: DataTypes.STRING,
        birth_date: DataTypes.DATE
    },
    {
        freezeTableName: true
    }
);

export default User;

(async () => {
    await db.sync();
})();
