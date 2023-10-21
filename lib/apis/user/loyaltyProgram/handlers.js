const Boom = require('@hapi/boom');
const moment = require('moment');
const { Op } = require('sequelize');

module.exports = {
    get: async (request, h) => {
        const { LoyaltyProgram } = request.server.app.models;
        const { airlineId } = request.params;

        try {
            const now = moment();
            const [loyaltyProgram] = await LoyaltyProgram.findAll({
                where: {
                    airlineId,
                    startDate: {
                        [Op.lte]: now
                    },
                    endDate: {
                        [Op.gte]: now
                    }
                },
                include: ['offers'],
                order: [['endDate', 'asc']],
                limit: 1
            });

            return { loyaltyProgram };
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },
}
