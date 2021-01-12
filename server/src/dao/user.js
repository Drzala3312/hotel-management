const Joi = require('joi');

const userDefinition = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(50).required(),
    lastname: Joi.string().alphanum().min(3).max(50).required(),
    username: Joi.string().alphanum().min(4).max(20).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{4,20}$/),
    type: Joi.string().alphanum().valid('admin', 'user','manager').required(),
    phone: Joi.number(),
    mobile: Joi.number().required(),
    city: Joi.string().min(2).max(50).required(),
    country:Joi.string().min(2).max(50).required(),
    email:Joi.string().regex(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/),
    organization:Joi.string(),
    age: Joi.number().required(),
    gender: Joi.string(),

});

module.exports = userDefinition;
