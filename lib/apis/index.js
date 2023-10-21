
exports.plugin = {
    pkg: require('./package.json'),
    register: async (server, options) => {

        await server.register({
            plugin: require('./user'),
            routes: {
                prefix: '/users'
            },
            options: options
        });

        await server.register({
            plugin: require('./airline/config'),
            routes: {
                prefix: '/airline/configs'
            },
            options: options
        });
    }

}
