const Boom = require('@hapi/boom');

module.exports = {
    get: async (request, h) => {
        const { user } = request.auth.credentials;
        const { LoyaltyProgram } = request.server.app.models;

        try {
            await user.airline.reload({
                include: [{
                    model: LoyaltyProgram,
                    include: ['offers']
                }]
            });

            return { loyaltyPrograms: user.airline.loyaltyPrograms };
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },

    create: async (request, h) => {
        const { LoyaltyProgram, Offer } = request.server.app.models;
        const {
            title,
            description,
            thresholdType,
            threshold,
            startDate,
            endDate,
            offerIds
        } = request.payload;
        const { airlineId } = request.auth.credentials.user;

        try {
            const loyaltyProgram = await LoyaltyProgram.create({
                title,
                description,
                thresholdType,
                threshold,
                startDate,
                endDate,
                airlineId
            });

            const offers = await Offer.findAll({
                where: {
                    id: offerIds
                }
            });

            await loyaltyProgram.setOffers(offers);

            return { loyaltyProgram };
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    }
};
