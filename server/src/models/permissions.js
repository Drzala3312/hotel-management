'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    const Permission = sequelize.define('permission', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        pname: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                len: [3, 50]
            },
            get() {
                const name = this.getDataValue('pname');
                return (name) ? name.charAt(0).toUpperCase() + name.slice(1) : null;
            }
        },
        module: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 50]
            },
            get() {
                const module= this.getDataValue('module');
                return (module) ? module.charAt(0).toUpperCase() + module.slice(1) : null;
            }
        },

        create: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: 1,
            get() {
                const isCreate = this.getDataValue('create');
                return (isCreate) ? true : false
            }
        },
        read: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: 1,
            get() {
                const isRead = this.getDataValue('read');
                return (isRead) ? true : false
            }
        },
        edit: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: 1,
            get() {
                const isUpdate = this.getDataValue('edit');
                return (isUpdate) ? true : false
            }
        },
        delete: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: 1,
            get() {
                const isDelete = this.getDataValue('delete');
                return (isDelete) ? true : false
            }
        },


    });

    return Permission;
};
