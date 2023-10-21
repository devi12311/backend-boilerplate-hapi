const Boom = require('@hapi/boom');
const {Sequelize} = require("sequelize");
const moment = require("moment");
const { Op } = Sequelize;
module.exports = {
    getRoulette: async (request, h) => {
        const { airlineId } = request.params;
        const { Roulette } = request.server.app.models;

        try {
            const now = moment();
            const roulette = await Roulette.findAll({
                where: {
                    airlineId,
                    startDate: {
                        $lte: now
                    },
                    endDate: {
                        $gte: now
                    }
                },
                include: ['offers'],
                order: [['endDate', 'asc']],
                limit: 1
            })

            return { roulette }

        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },
}
