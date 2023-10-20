const Sequelize = require('sequelize');

module.exports = {
    attributes: {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        userId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        passengerType: {
            type: Sequelize.STRING,
            validate: {
                isIn: [['ADULT', 'CHILD']]
            },
            allowNull: false
        },
        frequentFlyerNumber: {
            type: Sequelize.STRING,
            allowNull: false
        },
        linkedUserAccount: {
            type: Sequelize.STRING,
            allowNull: false
        },
        street: {
            type: Sequelize.STRING,
            allowNull: true
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        postalCode: {
            type: Sequelize.STRING,
            allowNull: true
        },
    },
    options: {}
}
