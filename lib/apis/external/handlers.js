const Boom = require('@hapi/boom');

module.exports = {
    createBooking: async (request, h) => {
        const { Ticket, Traveller } = request.server.app.models;
        const { payload: { tickets } } = request;

        try {
            return { ok: 'ok' };
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    }
};
