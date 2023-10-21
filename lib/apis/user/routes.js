const Handlers = require('./handlers');

module.exports = async (server, options) => {
    server.route({
        method: 'GET',
        path: '/airlines',
        options: {
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
            auth: {
                access: {
                    scope: ['user']
                }
            },
        },
        handler: Handlers.getOffers
    });
}
