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
            description: 'Create airline config',
            validate: {
                payload: Joi.object({
                    rewardingScheme: Joi.string().required()
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
            description: 'Get airline configs',
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
            description: 'Get airline config',
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

}
