const Sequelize = require('sequelize');

module.exports = {
    attributes: {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        eventName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        configId: {
            type: Sequelize.UUID,
            allowNull: true
        }
    },
    options: {}
}
