const Handlers = require('./handlers');
const { joiRequiredEmailTrimmed } = require('../../helpers/joi-schemas');
const Joi = require('joi');

module.exports = async (server, options) => {
    server.route({
        method: 'PUT',
        path: '/booking',
        options: {
            validate: {
                payload: Joi.object({
                    bookingReference: Joi.string().required(),
                    tickets: Joi.array().single().items(Joi.object({
                        ticketNumber: Joi.string().required(),
                        ticketingAirline: Joi.string().required(),
                        ticketStatus: Joi.string().valid('ACTIVE', 'CANCELLED', 'REFUNDED').required(),
                        issuedDate: Joi.date().required(),
                        traveller: Joi.object({
                            firstName: Joi.string().required(),
                            lastName: Joi.string().required(),
                            middleName: Joi.string().allow(null, ''),
                            salutation: Joi.string().required(),
                            gender: Joi.string().valid('M', 'F').required(),
                            passengerType: Joi.string().valid('ADULT', 'CHILD').required(),
                            document: Joi.object({
                                documentType: Joi.string().valid('passport').required(),
                                documentNumber: Joi.string().required(),
                                personalNumber: Joi.string().required(),
                                issuingCountry: Joi.string().required(),
                                issuedDate: Joi.date().required(),
                                expiryDate: Joi.date().required()
                            }),
                            frequentFlyerNumber: Joi.string().required(),
                            contact: Joi.object({
                                email: joiRequiredEmailTrimmed,
                                phone: Joi.string().required(),
                                address: Joi.object({
                                    street: Joi.string().required(),
                                    city: Joi.string().required(),
                                    postalCode: Joi.string().required()
                                }),
                            }),
                            linkedUserAccount: Joi.string().required()
                        })
                    }).required()),
                    bookedSegments: Joi.array().single().items(Joi.object({
                        origin: Joi.string().required(),
                        destination: Joi.string().required(),
                        flightNumber: Joi.string().required(),
                        flightDate: Joi.date().required(),
                        airlineCode: Joi.string().required(),
                        departureDate: Joi.date().required(),
                        arrivalDate: Joi.date().required(),
                        bookingClass: Joi.string().valid('economy', 'business'),
                        price: Joi.number().positive().required(),
                        taxPercentage: Joi.number().min(0).max(100).required(),
                    })),
                    user: Joi.object({
                        userId: Joi.string().required(),
                        firstName: Joi.string().required(),
                        lastName: Joi.string().required(),
                        email: joiRequiredEmailTrimmed,
                        phone: Joi.string().required(),
                        address: Joi.object({
                            street: Joi.string().required(),
                            city: Joi.string().required(),
                            postalCode: Joi.string().required()
                        }),
                        frequentFlyerNumber: Joi.string().required(),
                        document: Joi.object({
                            documentType: Joi.string().valid('passport').required(),
                            documentNumber: Joi.string().required(),
                            personalNumber: Joi.string().required(),
                            issuingCountry: Joi.string().required(),
                            issuedDate: Joi.date().required(),
                            expiryDate: Joi.date().required()
                        }),
                        dateOfBirth: Joi.date().required(),
                    })
                })
            }
        },
        handler: Handlers.createBooking
    });
}
