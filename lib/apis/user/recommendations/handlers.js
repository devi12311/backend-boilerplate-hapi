const { Op } = require('sequelize');
const Wreck = require('@hapi/wreck');
const Boom = require("@hapi/boom");
const baseUrl = 'http://172.31.98.16:8088';

module.exports = {
    getPersonalized: async (request, h) => {
        const { UserOffer, Offer, User, Flight } = request.server.app.models;
        const { user } = request.auth.credentials;
        const { userPassportNo } = request.pre;

        try {
            const { res, payload } = await Wreck.get(`/api/recommend/${userPassportNo}/PDT`, { baseUrl });
            const recs = JSON.parse(payload);
            console.log('==================================================')
            console.log(recs)
            console.log('==================================================')
            const reccomendations = [];
            for (const rec of recs) {
                const [destination]  = rec.split('-');
                const offer = await Offer.findOne({
                    where: {
                        origin: null,
                        destination
                    },
                    include: [{
                        model: User,
                        where: {
                            id: user.id
                        }
                    }]
                });

                if (offer) {
                    reccomendations.push(offer);
                } else {
                    const flight = await Flight.findOne({
                        where: {
                            destination
                        }
                    });
                    reccomendations.push(flight);
                }
            }
            return { reccomendations };
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },

    getPopular: async (request, h) => {
        try {
            const { res, payload } = await Wreck.get(`/api/popular/TIA`, { baseUrl });
            return JSON.parse(payload);
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },

    getLatest: async (request, h) => {
        try {
            const { res, payload } = await Wreck.get(`/api/latest/TIA`, { baseUrl });
            return JSON.parse(payload);
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },
}
