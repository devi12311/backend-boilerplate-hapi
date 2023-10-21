const Boom = require('@hapi/boom');
module.exports = {
    create: async (request, h) => {
        const {type, discount, startDate, endDate, title, imageUrl, description, origin, destination} = request.payload;
        const {Offer} = request.server.app.models;
        const {user} = request.auth.credentials;
        const {airline} = user;

        try {
            const offer = await Offer.create({
                type,
                discount,
                startDate,
                endDate,
                title,
                imageUrl,
                description,
                airlineId: airline.id,
                origin,
                destination
            })

            return {offer}
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },

    getOne: async (request, h) => {
        const {Offer} = request.server.app.models;
        const {id} = request.params;

        const offer = await Offer.findOne({
            where: {
                id
            }
        })

        return {offer}
    },

    delete: async (request, h) => {
        const {Offer} = request.server.app.models;
        const {id} = request.params;

        const offer = await Offer.findOne({
            where: {
                id
            }
        })

        if (!offer) {
            return Boom.notFound('Offer not found')
        }

        try {
            await offer.destroy();
            return {message: 'Offer deleted'}
        } catch (err) {
            return Boom.badImplementation(err)
        }
    }
}
