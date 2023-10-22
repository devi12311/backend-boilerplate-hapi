const Handlers = require('./handlers');

module.exports = async (server, options) => {
    server.route({
        method: 'POST',
        path: '/populate',
        options: {
            auth: false
        },
        handler: Handlers.populate
    });

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

    server.route({
        method: 'GET',
        path: '/offers/{offerId}/redeem',
        options: {
            tags: ['api', 'user', 'offers'],
            auth: {
                access: {
                    scope: ['user']
                }
            },
        },
        handler: Handlers.redeemOffer
    });
}
