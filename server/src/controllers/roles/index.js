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
 * @action read
 * @method get
 * @param id
 * @return Roles
 */
routes.push({
    meta: {
        name: 'rolesRead',
        method: 'GET',
        paths: ['/roles/:id'],
    },
    middleware: (req, res, next) => {
        models.roles
            .findOne({
                where: {
                    rid: {
                        [Sequelize.Op.eq]: req.params.id,
                    },
                },
                attributes: ['rid', 'name'],
                limit: 1,
                raw: true,
            })
            .then((data) => {
                const resObj =
                        {
                            rid: data.rid,
                            name: data.name,
                        }


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
            name: req.body.rolename,
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




routes.push({
    meta: {
        name: 'rolesUpdate',
        method: 'PUT',
        paths: ['/roles/:id'],
    },
    middleware: (req, res, next) => {
        const id = req.params.id;
        // object
        const form = {
            rid:  req.params.id,
            name: req.body.rolename,
        };

        console.log(form);
        console.log(models.permission);
        // update record
        models.roles
            .findOne({
                where: {
                    rid: {
                        [Sequelize.Op.eq]: req.params.id,
                    },
                },
            })
            .then((data) => {
                return data.update(form);
            }).then((data) => {
                res.json(data);
                return next();
            }).catch((err) => {
                console.log(err);
                res.status(404);
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
        paths: ['/roles/:id'],
    },
middleware: (req, res, next) => {
        models.roles
            .destroy({
                where: {
                    rid: {
                        [Sequelize.Op.eq]: req.params.id,
                    }
                    // },
                    // pid: {
                    //     [Sequelize.Op.eq]: req.body.pid,
                    // },
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
