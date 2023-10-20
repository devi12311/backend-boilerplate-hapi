
exports.plugin = {
    pkg: require('./package.json'),
    register: async (server, options) => {

        await server.register({
            plugin: require('./organization'),
            routes: {
                prefix: '/organizations'
            },
            options: options
        });
    }

}