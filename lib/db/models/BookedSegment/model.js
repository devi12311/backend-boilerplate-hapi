const Sequelize = require('sequelize');

module.exports = {
    attributes: {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        origin: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        destination: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        flightNumber: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        flightDate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        departureDate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        arrivalDate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        bookingClass: {
            type: Sequelize.STRING,
            validate: {
                isIn: [['economy', 'business']]
            },
            allowNull: false,
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        tax: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        ticketId: {
            type: Sequelize.UUID,
            allowNull: false
        },
    },
    options: {}
}
