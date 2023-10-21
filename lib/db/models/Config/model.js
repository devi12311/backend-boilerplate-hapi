const Sequelize = require('sequelize');

module.exports = {
    attributes: {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        rewardingScheme: {
            type: Sequelize.STRING,
            validate: {
                isIn: [['ROULETTE', 'TAILORED_OFFERS']]
            },
            allowNull: false,
        },
    },
    options: {}
}
