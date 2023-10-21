const Sequelize = require('sequelize');

module.exports = {
    attributes: {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        type: {
            type: Sequelize.STRING,
            validate: {
                isIn: [['DISCOUNT']]
            },
            allowNull: false,
        },
        origin: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        destination: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        flightNr: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        discount: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: true
        }
    },
    options: {}
}
