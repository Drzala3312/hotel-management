'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    const Users = sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        name: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 50]
            },
            get() {
                const name = this.getDataValue('name');
                return (name) ? name.charAt(0).toUpperCase() + name.slice(1) : null;
            }
        },
        lastname: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 50]
            },
            get() {
                const lastname = this.getDataValue('lastname');
                return (lastname) ? lastname.charAt(0).toUpperCase() + lastname.slice(1) : null;
            }
        },
        username: {
            type: Sequelize.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [4, 20]
            },
            set(val) {
                if (val) {
                    this.setDataValue('username', val.toLowerCase());
                }
            }
        },
        password: {
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        type: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 2,

            // set(val) {
            //     if (val) {
            //         this.setDataValue('type', val.toLowerCase());
            //     }
            // }
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: 1,
            get() {
                const isActive = this.getDataValue('active');
                return (isActive) ? true : false
            }
        },
        phone: {
            type: Sequelize.STRING(30),
            allowNull: true,
            validate: {
                len: [5, 50]
            }
        },
        mobile: {
            type: Sequelize.STRING(30),
            allowNull: true,
            validate: {
                len: [5, 50]
            }
        },
        city: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 50]
            }
        },
        country: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 50]
            }
        },
        email: {
            type: Sequelize.STRING(100),
            allowNull: true,
            validate: {
                isEmail: true,
            },
            set(val) {
                if (val) {
                    this.setDataValue('email', val.toLowerCase());
                }
            },
            get() {
                const email = this.getDataValue('email');
                return (email) ? email : '';
            }
        },
        organization: {
            type: Sequelize.STRING(50),
            allowNull: true,
            validate: {
                notEmpty: true,
                len: [2, 50]
            }
        },
        age: {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate: {
                isNumeric: true
            }
        },
        gender: {
            type: Sequelize.ENUM(),
            values: ['M', 'F'],
            validate: {
                isIn: [['M', 'F']],
            },
            set(val) {
                if (val) {
                    this.setDataValue('gender', val.toUpperCase());
                }
            }
        },
    });

    return Users;
};
