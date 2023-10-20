'use strict';
const { attributes: ModelAttributes, options: ModelOptions } = require('./model');
const Bcrypt = require('bcryptjs');


module.exports = async (server, options, sequelize) => {

    const Ticket = sequelize.define('ticket', ModelAttributes, ModelOptions);

    return Ticket;
}
