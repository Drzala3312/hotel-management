'use strict';

const Sequelize = require('sequelize');
const models = require('../../models');
const routes = [];

/**
 * @action list
 * @method get
 * @return permissions[]
 */
routes.push({
    meta: {
        name: 'permissionList',
        method: 'GET',
        paths: ['/permission'],
    },
    middleware: (req, res, next) => {
        models.permission
            .findAll({
                order: [['id', 'DESC']],
                attributes: [
                    'id',
                    'pname',
                    'module',
                    'create',
                    'read',
                    'edit',
                    'delete',

                ],
            })
            .then((data) => {
                const resObj = data.map((permission) => {
                    // tidy up the user data
                    return Object.assign(
                        {},
                        {
                            pid: permission.id,
                            module: permission.module,
                            pname: permission.pname,
                            create: (permission.dataValues.create == '1') ? true : false,
                            read: (permission.dataValues.read == '1') ? true : false,
                            edit: (permission.dataValues.edit == '1') ? true : false,
                            delete: (permission.dataValues.delete == '1') ? true : false,
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
 * @return permission
 */
routes.push({
    meta: {
        name: 'permissionRead',
        method: 'GET',
        paths: ['/permission/:id'],
    },
    middleware: (req, res, next) => {
        models.permission
            .findOne({
                where: {
                    id: {
                        [Sequelize.Op.eq]: req.params.id,
                    },
                },
                attributes: [
                    'id',
                    'pname',
                    'module',
                    'create',
                    'read',
                    'edit',
                    'delete',
                ],
                limit: 1,
                raw: true,
            })
            .then((permission) => {
                const resObj = {
                    pid: permission.id,
                    module: permission.module,
                    pname: permission.pname,
                    create: (permission.create == '1') ? true : false,
                    read: (permission.read == '1') ? true : false,
                    edit: (permission.edit == '1') ? true : false,
                    delete: (permission.delete == '1') ? true : false,
                };
                res.json(resObj);
                return next();
            });
    },
});

/**
 * @action create
 * @method post
 * @return permission
 */
routes.push({
    meta: {
        name: 'permissionCreate',
        method: 'POST',
        paths: ['/permission'],
    },
    middleware: (req, res, next) => {
        // object
        const form = {
            pname: req.body.pname,
            module: req.body.module,
            create: req.body.create,
            read: req.body.read,
            edit: req.body.edit,
            delete: req.body.delete,
        };

        console.log(models.permission);
        // create record
        models.permission
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
 * @action update
 * @method put
 * @param id
 * @return permission
 */
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
            pname: req.body.pname,
            module: req.body.module,
            create: req.body.create,
            read: req.body.read,
            edit: req.body.update,
            delete: req.body.delete,
        };

        console.log(models.permission.find);
        // update record
        models.permission
            .find({
                where: {
                    id: {
                        [Sequelize.Op.eq]: req.params.id,
                    },
                },
            })
            .then((data) => {
                return data.updateAttributes(form);
            })
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
 * @param id
 **/

routes.push({
    meta: {
        name: 'permissionDelete',
        method: 'DEL',
        paths: ['/permission/:id'],
    },
    middleware: (req, res, next) => {
        models.permission
            .destroy({
                where: {
                    id: {
                        [Sequelize.Op.eq]: req.params.id,
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

/**
 * @action userPermission
 * @method get
 * @param id
 **/

// routes.push({
//     meta: {
//         name: 'userPermission',
//         method: 'GET',
//         paths: [
//             '/userPermission/:id'
//         ]
//     },
//     middleware: (req, res, next) => {

//         sequelize.query("SELECT p.create,p.read,p.edit,p.delete,p.module from role_permission as rp,permission as p where p.module='user' and rp.pid = p.pid and rp.rid = (SELECT rid FROM user_role WHERE uid = ?)",
//             {
//                 replacements: [req.params.id]
//             }).then((result) => {
//                 res.send(200, result);
//                 return next();
//             }).catch((err) => {
//                 console.log(err);
//                 res.status(404);
//                 return next();
//             });
//     }
// });

module.exports = routes;
