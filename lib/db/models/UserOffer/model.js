const Sequelize = require('sequelize');

module.exports = {
    attributes: {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        userId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        offerId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
    },
    options: {}
}
