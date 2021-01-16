'use strict';

const Sequelize = require('sequelize');
const models = require('../../models');
const passwordHash = require('password-hash');
const { sequelize } = require('../../models');
const routes = [];

/**
 * @action list
 * @method get
 * @return Users[]
 */
routes.push({
    meta: {
        name: 'userList',
        method: 'GET',
        paths: ['/user'],
    },
    middleware: (req, res, next) => {

        sequelize.query("SELECT u.id as uid,u.created_at,u.name,r.name as type,u.lastname,u.username as userName,u.email,u.gender,u.age,u.organization,u.city,u.country,u.phone,u.mobile,u.active from users as u,user_role as ur,roles as r where u.id = ur.uid and ur.rid = r.rid")
        .then((result) => {
            res.send(200, result[0]);
            return next();
        }).catch((err) => {
            console.log(err);
            res.status(404);
            return next();
        });

        // models.users
        //     .findAll({
        //         order: [['id', 'DESC']],
        //         attributes: [
        //             'id',
        //             'created_at',
        //             'username',
        //             'name',
        //             'lastname',
        //             'type',
        //             'active',
        //             'email',
        //             'phone',
        //             'mobile',
        //             'city',
        //             'country',
        //             'organization',
        //             'age',
        //             'gender',
        //         ],
        //     })
        //     .then((data) => {
        //         const resObj = data.map((user) => {
        //             // tidy up the user data
        //             return Object.assign(
        //                 {},
        //                 {
        //                     uid: user.id,
        //                     created_at: user.created_at,
        //                     userName: user.username,
        //                     lastname: user.lastname,
        //                     name: user.name,
        //                     type: user.type,
        //                     active: user.active,
        //                     phone: user.phone,
        //                     mobile: user.mobile,
        //                     city: user.city,
        //                     country: user.country,
        //                     email: user.email,
        //                     organization: user.organization,
        //                     age: user.age,
        //                     gender: user.gender,
        //                 }
        //             );
        //         });
        //         res.json(resObj);
        //         return next();
        //     });
    },
});

/**
 * @action read
 * @method get
 * @param id
 * @return Users
 */
routes.push({
    meta: {
        name: 'userRead',
        method: 'GET',
        paths: ['/user/:id'],
    },
    middleware: (req, res, next) => {

        sequelize.query("SELECT u.id as uid,u.created_at,u.name,r.rid as type,u.lastname,u.username as userName,u.email,u.gender,u.age,u.organization,u.city,u.country,u.phone,u.mobile,u.active from users as u,user_role as ur,roles as r where u.id = ? and u.id = ur.uid and ur.rid = r.rid",
        {
            replacements: [req.params.id]
        })
        .then((result) => {
            res.send(200, result[0]);
            return next();
        }).catch((err) => {
            console.log(err);
            res.status(404);
            return next();
        });

        // models.users
        //     .findOne({
        //         where: {
        //             id: {
        //                 [Sequelize.Op.eq]: req.params.id,
        //             },
        //         },
        //         attributes: [
        //             'id',
        //             'created_at',
        //             'username',
        //             'name',
        //             'lastname',
        //             'type',
        //             'active',
        //             'email',
        //             'phone',
        //             'mobile',
        //             'city',
        //             'country',
        //             'organization',
        //             'age',
        //             'gender',
        //         ],
        //         limit: 1,
        //         raw: true,
        //     })
        //     .then((data) => {
        //         const resObj = {
        //             uid: data.id,
        //             created_at: data.created_at,
        //             userName: data.username,
        //             lastname: data.lastname,
        //             name: data.name,
        //             type: data.type,
        //             active: data.active,
        //             phone: data.phone,
        //             mobile: data.mobile,
        //             city: data.city,
        //             country: data.country,
        //             email: data.email,
        //             organization: data.organization,
        //             age: data.age,
        //             gender: data.gender,
        //         };

        //         res.json(resObj);
        //         return next();
        //     });
    },
});

/**
 * @action create
 * @method post
 * @return Users
 */
routes.push({
    meta: {
        name: 'userCreate',
        method: 'POST',
        paths: ['/user'],
    },
    middleware: (req, res, next) => {
        // object
        const form = {
            name: req.body.name,
            lastname: req.body.lastname,
            username: req.body.username,
            active: req.body.active,
            password: passwordHash.generate(req.body.password),
            //type: req.body.type,
            phone: req.body.phone ? req.body.phone : null,
            mobile: req.body.mobile ? req.body.mobile : null,
            city: req.body.city,
            country: req.body.country,
            email: req.body.email ? req.body.email : null,
            organization: req.body.organization ? req.body.organization : null,
            age: req.body.age ? req.body.age : null,
            gender: req.body.gender ? req.body.gender : null,
        };

        models.sequelize.transaction((t) => {
            // create booking
            var id;
            return models.users.create(form).then((data) => {
                id = data.dataValues.id;
                console.log(req.body.type);
                return models.sequelize.query('INSERT INTO user_role (uid, rid) VALUES (:uid, :rid)', {
                    transaction: t,
                    replacements: {
                        uid: data.dataValues.id,
                        rid: req.body.type
                    },
                    type: Sequelize.QueryTypes.INSERT
                })
            }).then((data) => {
                //return data;
                //res.send(200, data);
                res.json({id:id});
                return next();
            }).catch((err) => {
                console.log(err);
                res.json(err);
                return next();
            });
        })
    },
});

/**
 * @action update
 * @method put
 * @param id
 * @return Users
 */
routes.push({
    meta: {
        name: 'userUpdate',
        method: 'PUT',
        paths: ['/user/:id'],
    },
    middleware: (req, res, next) => {
        const id = req.params.id;
        // object
        const form = {
            name: req.body.name,
            // password: req.body.password,
            type: req.body.type,
            active: req.body.active,
            phone: req.body.phone ? req.body.phone : null,
            mobile: req.body.mobile ? req.body.mobile : null,
            city: req.body.city,
            country: req.body.country,
            email: req.body.email ? req.body.email : null,
            organization: req.body.organization ? req.body.organization : null,
            age: req.body.age ? req.body.age : null,
            gender: req.body.gender ? req.body.gender : null,
        };

        console.log(form);
        console.log(models.permission);

        // update record
        models.users
            .findOne({
                where: {
                    id: {
                        [Sequelize.Op.eq]: req.params.id,
                    },
                },
            })
            .then((data) => {
                return data.update(form);
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
        name: 'userDelete',
        method: 'DEL',
        paths: ['/user/:id'],
    },
    middleware: (req, res, next) => {
        models.users
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

/**
 * @action userCount
 * @method get
 * @param id
 **/

routes.push({
    meta: {
        name: 'userCount',
        method: 'GET',
        paths: [
            '/userCount'
        ]
    },
    middleware: (req, res, next) => {

        sequelize.query("select count(*) as total from users")
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
