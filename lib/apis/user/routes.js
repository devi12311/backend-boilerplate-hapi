// const Handlers = require('./handlers');

module.exports = async (server, options) => {
    server.route({
        method: 'GET',
        path: '/',
        options: {
            auth: {
                access: {
                    scope: ['user']
                }
            },
        },
        handler: (req, h) => ({ ok: 'ok' })
    });
}
