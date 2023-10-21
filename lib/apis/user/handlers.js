module.exports = {
    getAirlines: async (request, h) => {
        const { Airline } = request.server.app.models;

        try {
            const airlines = await Airline.findAll();

            return { airlines };
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    }
}
