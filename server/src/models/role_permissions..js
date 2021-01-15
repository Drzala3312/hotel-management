'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    const Role_permissions = sequelize.define('role_permissions', {
        rid: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        pid: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    });

    return Role_permissions;
};
