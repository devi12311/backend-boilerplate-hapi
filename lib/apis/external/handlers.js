const Boom = require('@hapi/boom');

module.exports = {
    createBooking: async (request, h) => {
        const { Offer, UserOffer } = request.server.app.models;
        const { offerId, userId } = request.payload;

        try {
            let offer = null;

            if (offerId) {
                offer = await Offer.findByPk(offerId);

                if (!offer) {
                    return Boom.notFound('Offer not found');
                }

                const where = { userId };
                where.offerId = offerId;
                const ex = await UserOffer.findOne({ where });

                if (ex) {
                    return Boom.conflict('Offer already booked');
                }
                await UserOffer.create({
                    userId,
                    offerId,
                    bookingId: offerId
                });
            }

            return { ok: 'ok' };
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    }
};
