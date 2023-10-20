const Sequelize = require('sequelize');

module.exports = {
    attributes: {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        number: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        airlineId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING,
            validate: {
                isIn: [['REFUNDED', 'CONFIRMED']]
            },
            allowNull: false,
        },
        issueDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        travelerId: {
            type: Sequelize.UUID,
            allowNull: false
        }
    },
    options: {}
}
