const { Op } = require('sequelize');
const Wreck = require('@hapi/wreck');
const {Boom} = require("@hapi/boom");

module.exports = {
    getPersonalized: async (request, h) => {
        const { userPassportNo } = request.pre;

        try {
            const { res, payload } = await Wreck.get(`http://localhost:8088/api/recommend/${userPassportNo}`);
            return JSON.parse(payload);
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },

    getPopular: async (request, h) => {
        try {
            const { res, payload } = await Wreck.get(`http://localhost:8088/api/popular`);
            return JSON.parse(payload);
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },

    getLatest: async (request, h) => {
        try {
            const { res, payload } = await Wreck.get(`http://localhost:8088/api/latest`);
            return JSON.parse(payload);
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },
}
