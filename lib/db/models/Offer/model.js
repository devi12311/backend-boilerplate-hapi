const Sequelize = require('sequelize');

module.exports = {
    attributes: {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        type: {
            type: Sequelize.STRING,
            validate: {
                isIn: [['DISCOUNT']]
            },
            allowNull: false,
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
