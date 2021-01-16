'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    const User_role = sequelize.define('user_role', {
        uid: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        rid: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    });

    return User_role;
};
