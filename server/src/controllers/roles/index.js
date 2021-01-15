'use strict';

const Sequelize = require('sequelize');
const models = require('../../models');
const routes = [];

/**
 * @action list
 * @method get
 * @return roles[]
 */

routes.push({
    meta: {
        name: 'rolesCreate',
        method: 'GET',
        paths: ['/roles'],
    },
    middleware: (req, res, next) => {
        models.roles
            .findAll({
                attributes: [
                    'rid',
                    'name',
                ],
            })
            .then((data) => {
                const resObj = data.map((permission) => {
                    // tidy up the user data
                    return Object.assign(
                        {},
                        {
                            rid: permission.rid,
                            name: permission.name
                        }
                    );
                });
                res.json(resObj);
                return next();
            });
    },
});

/**
 * @action create
 * @method post
 * @return roles
 */
routes.push({
    meta: {
        name: 'rolesCreate',
        method: 'POST',
        paths: ['/roles'],
    },
    middleware: (req, res, next) => {
        // object
        const form = {
            rid: req.body.rid,
            name: req.body.name
        };

        // create record
        models.roles
            .create(form)
            .then((data) => {
                res.json(data);
                return next();
            })
            .catch((err) => {
                if (err.name === 'SequelizeValidationError') {
                    res.status(400);
                    res.json({
                        errors: err.errors,
                        name: err.name,
                    });
                } else {
                    res.json(err);
                }
                return next();
            });
    },
});

/**
 * @action delete
 * @method delete
 **/

routes.push({
    meta: {
        name: 'rolesDelete',
        method: 'DEL',
        paths: ['/roles'],
    },
    middleware: (req, res, next) => {
        models.role_permissions
            .destroy({
                where: {
                    rid: {
                        [Sequelize.Op.eq]: req.body.rid,
                    },
                    pid: {
                        [Sequelize.Op.eq]: req.body.pid,
                    }
                },
            })
            .then((result) => {
                res.send(200, { deleted: result });
                return next();
            })
            .catch((err) => {
                console.log(err);
                res.status(404);
                return next();
            });
    },
});

module.exports = routes;