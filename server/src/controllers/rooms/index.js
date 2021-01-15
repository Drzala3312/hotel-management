'use strict';

const Sequelize = require('sequelize');
const models = require('../../models');
const { sequelize } = require('../../models');	
const routes = [];

/**
 * @action list
 * @method get
 * @return Rooms[]
 */
routes.push({
    meta: {
        name: 'roomList',
        method: 'GET',
        paths: [
            '/room'
        ]
    },
    middleware: (req, res, next) => {
        models.rooms.findAll({
            order: [
                ['id', 'DESC']
            ],
            attributes: [
                ['id', 'uid'],
                'created_at',
                'currency',
                'price_night',
                'type',
                'name',
                'max_guests',
                'available'
            ]
        }).then((data) => {
            res.json(data);
            return next();
        }).catch((err) => {
            res.status(400);
            if (err.name === 'SequelizeValidationError') {
                res.json({
                    errors: err.errors,
                    name: err.name
                });
            } else {
                res.json(err);
            }

            return next();
        });
    }
});

/**
 * @action read
 * @method get
 * @param id
 * @return Rooms
 */
routes.push({
    meta: {
        name: 'roomRead',
        method: 'GET',
        paths: [
            '/room/:id'
        ]
    },
    middleware: (req, res, next) => {
        models.rooms.findOne({
            where: {
                id: {
                    [Sequelize.Op.eq]: req.params.id
                }
            },
            attributes: [
                ['id', 'uid'],
                'created_at',
                'currency',
                'price_night',
                'type',
                'name',
                'max_guests',
                'available'
            ],
            limit: 1
        }).then((data) => {
            res.json(data);
            return next();
        }).catch((err) => {
            res.status(400);
            if (err.name === 'SequelizeValidationError') {
                res.json({
                    errors: err.errors,
                    name: err.name
                });
            } else {
                res.json(err);
            }

            return next();
        });
    }
});

/**
 * @action create
 * @method post
 * @return Rooms
 */
routes.push({
    meta: {
        name: 'roomCreate',
        method: 'POST',
        paths: [
            '/room'
        ]
    },
    middleware: (req, res, next) => {
        // object
        const form = {
            currency: req.body.currency,
            price_night: req.body.price_night,
            type: req.body.type,
            name: req.body.name,
            max_guests: (req.body.max_guests) ? req.body.max_guests : null,
            available: req.body.available
        };

        // create record
        models.rooms.create(form).then((data) => {
            res.json(data);
            return next();
        }).catch((err) => {
            res.status(400);
            if (err.name === 'SequelizeValidationError') {
                res.json({
                    errors: err.errors,
                    name: err.name
                });
            } else {
                res.json({
                    errors: [{
                        message: err.message
                    }]
                });
            }

            return next();
        });
    }
});

/**
 * @action update
 * @method put
 * @param id
 * @return Rooms
 */
routes.push({
    meta: {
        name: 'roomUpdate',
        method: 'PUT',
        paths: [
            '/room/:id'
        ]
    },
    middleware: (req, res, next) => {
        const id = req.params.id;
        // object
        const form = {
            currency: req.body.currency,
            price_night: req.body.price_night,
            type: req.body.type,
            name: req.body.name,
            max_guests: (req.body.max_guests) ? req.body.max_guests : null,
            available: req.body.available
        };

        // update record
        models.rooms.findOne({
            where: {
                id: {
                    [Sequelize.Op.eq]: req.params.id
                }
            }
        }).then(data => {
            return data.update(form);
        }).then((data) => {
            res.json(data);
            return next();
        }).catch((err) => {
            res.status(400);
            if (err.name === 'SequelizeValidationError') {
                res.json({
                    errors: err.errors,
                    name: err.name
                });
            } else {
                res.json({
                    errors: [{
                        message: err.message
                    }]
                });
            }

            return next();
        });
    }
});

/**
 * @action delete
 * @method delete
 * @param id
 **/

routes.push({
    meta: {
        name: 'roomDelete',
        method: 'DEL',
        paths: [
            '/room/:id'
        ]
    },
    middleware: (req, res, next) => {
        models.rooms.destroy({
            where: {
                id: {
                    [Sequelize.Op.eq]: req.params.id
                }
            }
        }).then((result) =>{
            res.send(200,{"deleted": result});
            return next();
        }).catch((err) => {
            console.log(err);
            res.status(404);
            return next();
        });
    }
});


/**
 * @action bookingPermission
 * @method delete
 * @param id
 **/

routes.push({
    meta: {
        name: 'roomPermission',
        method: 'GET',
        paths: [
            '/roomPermission/:id'
        ]
    },
    middleware: (req, res, next) => {

        sequelize.query("SELECT p.create,p.read,p.edit,p.delete,p.module from role_permission as rp,permissions as p where p.module='room' and rp.pid = p.id and rp.rid = (SELECT rid FROM user_role WHERE uid = ?)",
            {
                replacements: [req.params.id]
            }).then((result) => {
                res.send(200, result);
                return next();
            }).catch((err) => {
                console.log(err);
                res.status(404);
                return next();
            });
    }
});

/**
 * @action roomCount
 * @method get
 * @param id
 **/

routes.push({
    meta: {
        name: 'roomCount',
        method: 'GET',
        paths: [
            '/roomCount'
        ]
    },
    middleware: (req, res, next) => {

        sequelize.query("select count(*) as total from rooms")
        .then((result) => {
                res.send(200, result);
                return next();
            }).catch((err) => {
                console.log(err);
                res.status(404);
                return next();
            });
    }
});

module.exports = routes;
