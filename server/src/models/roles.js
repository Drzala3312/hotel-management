'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    const Role = sequelize.define('roles', {
        rid: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true

        },
        name: {
            type: Sequelize.STRING(45),
            allowNull: false,
        }
    });

    return Role;
};
