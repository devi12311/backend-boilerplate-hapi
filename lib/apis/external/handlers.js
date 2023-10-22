const Boom = require('@hapi/boom');
const Wreck = require('@hapi/wreck');
const moment = require('moment');

module.exports = {
    createBooking: async (request, h) => {
        const { Offer, UserOffer, User, Document } = request.server.app.models;
        const {
            offerId,
            origin,
            destination,
            documentNumber,
            passengerType,
            airlineCode,
            bookingClass,
        } = request.payload;

        try {
            let offer = null;

            const headers = {
                'content-type': 'application/json; charset=utf-8',
            }

            const baseUrl = 'http://172.31.98.16:8088';
            const now = moment();

            const user = await User.findOne({
                include: [
                    {
                        model: Document,
                        where: {
                            number: documentNumber
                        }
                    }
                ]
            });

            await Wreck.post('/api/user', {
                baseUrl,
                headers,
                payload: {
                    Labels: [origin],
                    UserId: documentNumber
                }
            });

            await Wreck.post('/api/item', {
                baseUrl,
                headers,
                payload: {
                    Categories: [origin],
                    IsHidden: false,
                    ItemId: `${origin}-${destination}`,
                    Labels: [destination],
                    Timestamp: now
                }
            });

            await Wreck.post('/api/feedback', {
                baseUrl,
                headers,
                payload: [
                    {
                        FeedbackType: "book",
                        ItemId: `${origin}-${destination}`,
                        Timestamp: now,
                        UserId: documentNumber
                    },
                ]
            });

            if (offerId) {
                offer = await Offer.findByPk(offerId, {
                    include: ['users']
                });

                if (!offer) {
                    return Boom.notFound('Offer not found');
                }

                if (offer.users.map(u => u.id).includes(user.id)) {
                    return { ok: 'ok' };
                }

                const where = { userId: user.id };
                where.offerId = offerId;
                const ex = await UserOffer.findOne({ where });

                if (ex) {
                    return Boom.conflict('Offer already booked');
                }
                await UserOffer.create({
                    userId: user.id,
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
