const { create, get } = require('./handlers');
const Joi = require('joi');
module.exports = async (server, options) => {
    server.route({
        method: 'GET',
        path: '/',
        options: {
            description: 'Get all loyalty programs',
            auth: {
                access: {
                    scope: ['airline']
                }
            }
        },
        handler: get
    });

    server.route({
        method: 'POST',
        path: '/',
        options: {
            description: 'Create a new loyalty program',
            auth: {
                access: {
                    scope: ['airline']
                }
            },
            validate: {
                payload: Joi.object({
                    title: Joi.string().allow(null, ''),
                    description: Joi.string().allow(null, ''),
                    thresholdType: Joi.string().valid('points', 'miles', 'flights').required(),
                    threshold: Joi.number().positive().required(),
                    startDate: Joi.date().required().default(new Date()),
                    endDate: Joi.date().required(),
                    offerIds: Joi.array().items(Joi.string().required()).required(),
                })
            }
        },
        handler: create
    });
}
