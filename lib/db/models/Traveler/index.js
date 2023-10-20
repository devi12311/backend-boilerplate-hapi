'use strict';
const { attributes: ModelAttributes, options: ModelOptions } = require('./model');
const Bcrypt = require('bcryptjs');


module.exports = async (server, options, sequelize) => {

    const Traveler = sequelize.define('traveler', ModelAttributes, ModelOptions);

    return Traveler;
}
