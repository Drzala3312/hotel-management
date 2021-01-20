'use strict';

const Sequelize = require('sequelize');
const models = require('../../models');
const routes = [];

/**
 * @action list
 * @method get
 * @return rolePermissions[]
 */

routes.push({
    meta: {
        name: 'rolePermissionList',
        method: 'GET',
        paths: ['/rolePermissions'],
    },
    middleware: (req, res, next) => {
        models.role_permissions
            .findAll({
                attributes: [
                    'rid',
                    'pid',
                ],
            })
            .then((data) => {
                const resObj = data.map((permission) => {
                    // tidy up the user data
                    return Object.assign(
                        {},
                        {
                            rid: permission.rid,
                            pid: permission.pid
                        }
                    );
                });
                res.json(resObj);
                return next();
            });
    },
});


/**
 * @action list
 * @method get
 * @return rolePermissionsbyID[]
 */

routes.push({
    meta: {
        name: 'rolePermissionList',
        method: 'GET',
        paths: ['/rolePermissions/:id'],
    },
    middleware: (req, res, next) => {

        models.role_permissions
        .findAll({
            where: {
                rid: {
                    [Sequelize.Op.eq]: req.params.id,
                },
            },
            attributes: ['rid', 'pid'],

            raw: true,
        })
        .then((data) => {
            const resObj = data.map((role) => {
                // tidy up the user data
                return Object.assign(
                    {},
                    {
                        rid: role.rid,
                        pid: role.pid
                    }
                );
            });
            // const resObj =
            //         {
            //             rid: data.rid,
            //             pid: data.pid,
            //         }


            res.json(resObj);
            return next();
        }) .catch((err) => {
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
 * @action create
 * @method post
 * @return rolePermissions
 */
routes.push({
    meta: {
        name: 'rolePermissionCreate',
        method: 'POST',
        paths: ['/rolePermissions'],
    },
    middleware: (req, res, next) => {
        // object
        const form = {
            rid: req.body.rid,
            pid: req.body.pid
        };

        // create record
        models.role_permissions
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
        name: 'rolePermissionsDelete',
        method: 'DEL',
        paths: ['/rolePermissions/:rid/:pid'],
    },
    middleware: (req, res, next) => {
        models.role_permissions
            .destroy({
                where: {
                    rid: {
                        [Sequelize.Op.eq]: req.params.rid,
                    },
                    pid: {
                        [Sequelize.Op.eq]: req.params.pid,
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
