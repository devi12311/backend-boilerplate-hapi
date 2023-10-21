const Handlers = require('./handlers');
const Joi = require('joi');
const Boom = require('@hapi/boom');

module.exports = async (server, options) => {

    server.route({
        method: 'POST',
        path: '/',
        options: {
            auth: {
                access: {
                    scope: ['airline']
                }
            },
            description: 'Create airline roulette',
            validate: {
                payload: Joi.object({
                    eventName: Joi.string().required(),
                    startDate: Joi.date().allow(null),
                    endDate: Joi.date().allow(null),
                })
            },
        },
        handler: Handlers.create
    });

    server.route({
        method: 'GET',
        path: '/',
        options: {
            auth: {
                access: {
                    scope: ['airline']
                }
            },
            description: 'Get airline roulettes',
            validate: {},
        },
        handler: Handlers.getAll
    });

    server.route({
        method: 'GET',
        path: '/{id}',
        options: {
            auth: {
                access: {
                    scope: ['airline']
                }
            },
            description: 'Get airline roulette',
            validate: {
                params: Joi.object({
                    id: Joi.string().uuid().required()
                }).required()
            },
        },
        handler: Handlers.getOne
    });

    server.route({
        method: 'DELETE',
        path: '/{id}',
        options: {
            auth: {
                access: {
                    scope: ['airline']
                }
            },
            description: 'Get users organizations',
            validate: {
                params: Joi.object({
                    id: Joi.string().uuid().required()
                }).required()
            },
        },
        handler: Handlers.delete
    });

    server.route({
        method: 'POST',
        path: '/{id}/offers',
        options: {
            auth: {
                access: {
                    scope: ['airline']
                }
            },
            description: 'Populate roulette with offers',
            validate: {
                params: Joi.object({
                    id: Joi.string().uuid().required(),
                    offerIds: Joi.array().items({
                        id: Joi.string().uuid().required()
                    })
                }).required()
            },
        },
        handler: Handlers.bulkInsertOffers
    });

}
