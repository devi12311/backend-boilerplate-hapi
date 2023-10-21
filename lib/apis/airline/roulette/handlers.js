const Boom = require('@hapi/boom');
module.exports = {
    create: async (request, h) => {
        const { eventName, startDate, endDate, offerIds } = request.payload;
        const { user } = request.auth.credentials;
        const { airline } = user;
        const { Roulette, Offer } = request.server.app.models;

        try {

            const roulette = await Roulette.create({
                eventName,
                startDate,
                endDate,
                airlineId: airline.id
            })

            const offers = await Offer.findAll({
                where: {
                    id: offerIds
                }
            })

            await roulette.setOffers(offers)

            return roulette

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
            },
            include: ''
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
        const { RouletteOffer, Offer } = request.server.app.models;

        const offers = await Offer.findAll({
            where: {
                id: offerIds
            },

        })
        await RouletteOffer.bulkCreate(offers)

        return { message: 'inserted' }
    }
}
