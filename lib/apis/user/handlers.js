const { Op } = require('sequelize');

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
    },

    getOffers: async (request, h) => {
        const { user } = request.auth.credentials;

        try {
            const offers = await user.getOffers({
                through: {
                    where: {
                        bookingId: {
                            [Op.ne]: null
                        }
                    }
                }
            });

            return { offers };
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },

    redeemOffer: async (request, h) => {
        const { offerId } = request.params;

        return { message: "You can book the flight on the airline provider to complete the offer redeem"}
    }
}
