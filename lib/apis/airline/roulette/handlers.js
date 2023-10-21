const Boom = require('@hapi/boom');
module.exports = {
    create: async (request, h) => {
        const { eventName, startDate, endDate } = request.payload;
        const { user } = request.auth.credentials;
        const { airline } = user;
        const { Roulette } = request.server.app.models;

        try {

            return await Roulette.create({
                eventName,
                startDate,
                endDate,
                airlineId: airline.id
            })

        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },

    getAll: async (request, h) => {
        const { Roulette } = request.server.app.models;
        const { user } = request.auth.credentials;
        const { airline } = user;

        return await Roulette.findAll({
            where: {
                airlineId: airline.id
            }
        })
    },

    getOne: async (request, h) => {
        const { Roulette } = request.server.app.models;
        const { user } = request.auth.credentials;
        const { airline } = user;
        const { id } = request.params;

        return await Roulette.findOne({
            where: {
                airlineId: airline.id,
                id
            }
        })
    },

    delete: async (request, h) => {
        const { Roulette } = request.server.app.models;
        const { user } = request.auth.credentials;
        const { airline } = user;
        const { id } = request.params;

        const roulette = await Roulette.findOne({
            where: {
                airlineId: airline.id,
                id
            }
        })

        if (!roulette) {
            return Boom.notFound('Roulette not found')
        }

        try {
            await roulette.destroy();
            return { message: 'Roulette deleted' }
        } catch (err) {
            return Boom.badImplementation(err)
        }
    },

    bulkInsertOffers: async (request, h) => {
        const { id } = request.params;
        const { offerIds } = request.payload;
        const { RouletteOffer } = request.server.app.models;

        const mappedOffers = offerIds.map((offerId) => ({ offerId, rouletteId: id}))
        await RouletteOffer.bulkCreate(mappedOffers)

        return { message: 'inserted' }
    }
}
