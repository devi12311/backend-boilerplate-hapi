
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
            plugin: require('./airline/roulette'),
            routes: {
                prefix: '/airline/roulette'
            },
            options: options
        });
    }

}
