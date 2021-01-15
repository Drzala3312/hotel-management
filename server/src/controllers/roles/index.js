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
                attributes: ['rid', 'name'],
            })
            .then((data) => {
                const resObj = data.map((permission) => {
                    // tidy up the user data
                    return Object.assign(
                        {},
                        {
                            rid: permission.rid,
                            name: permission.name,
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
            name: req.body.name,
            permissions: req.body.permissions ? req.body.permissions : null,
        };

        // create record
        models.roles
            .create(form)
            .then((data) => {
                res.json(data);
                if (data.length > 0) {

                    // open transaction
                    return models.sequelize
                        .transaction((t) => {
                            // create booking
                            return models.roles.create(form).then((data) => {
                                // map rooms and create one by one
                                return Promise.map(form.permissions, (pid) => {
                                    return models.sequelize.query(
                                        'INSERT INTO role_permission (rid, pid) VALUES (:rid, :pid)',
                                        {
                                            transaction: t,
                                            replacements: {
                                                rid: data.id,
                                                pid: pid,
                                            },
                                            type: Sequelize.QueryTypes.INSERT,
                                        }
                                    );
                                }).then(() => {
                                    return data;
                                });
                            });
                        })
                        .then((data) => {
                            res.json(data);
                            return next();
                        })
                        .catch((err) => {
                            res.status(400);
                            if (err.name === 'SequelizeValidationError') {
                                res.json({
                                    errors: err.errors,
                                    name: err.name,
                                });
                            } else {
                                res.json({
                                    errors: [
                                        {
                                            message: err.message,
                                        },
                                    ],
                                });
                            }

                            return next();
                        });
                } else {
                    throw Error('Select at least one room');
                }

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




routes.push({
    meta: {
        name: 'permissionUpdate',
        method: 'PUT',
        paths: ['/permission/:id'],
    },
    middleware: (req, res, next) => {
        const id = req.params.id;
        // object
        const form = {
            rid: req.body.rid,
            name: req.body.name,
            permissions: req.body.permissions ? req.body.permissions : null,
        };

        console.log(form);
        console.log(models.permission);
        // update record
        models.permission
            .findOne({
                where: {
                    id: {
                        [Sequelize.Op.eq]: req.params.id,
                    },
                },
            })
            .then((data) => {
                return data.update(form).then((updated) => {
                    return models.sequelize.query('DELETE FROM role_permission WHERE rid = :rid', {
                        transaction: t,
                        replacements: {
                            booking_id: updated.id
                        },
                        type: Sequelize.QueryTypes.DELETE
                    }).then(() => {
                        // map pid and create one by one
                        return Promise.map(form.permissions, (pid) => {
                            return models.sequelize.query('INSERT INTO role_permission (rid, pid) VALUES (:rid, :pid)', {
                                transaction: t,
                                replacements: {
                                    rid: data.id,
                                    pid: pid,
                                },
                                type: Sequelize.QueryTypes.INSERT
                            });
                        }).then(() => {
                            return updated;
                        });
                    });
                });
            })
            .then((data) => {
                res.json(data);
                return next();
            })
            .catch((err) => {
                console.log(err)
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
                    },
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
