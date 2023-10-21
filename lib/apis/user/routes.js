const Handlers = require('./handlers');

module.exports = async (server, options) => {
    server.route({
        method: 'GET',
        path: '/airlines',
        options: {
            tags: ['api', 'user', 'airlines'],
            auth: {
                access: {
                    scope: ['user']
                }
            },
        },
        handler: Handlers.getAirlines
    });

    server.route({
        method: 'GET',
        path: '/offers',
        options: {
            tags: ['api', 'user', 'offers'],
            auth: {
                access: {
                    scope: ['user']
                }
            },
        },
        handler: Handlers.getOffers
    });
}
