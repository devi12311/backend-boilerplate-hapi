module.exports = async (models) => {
    const { User, Traveler, Airline, Token, Ticket, Document, BookedSegment, Config } = models;

    // inject all models associations
    await Traveler.belongsTo(User);

    await Ticket.belongsTo(Traveler);
    await Airline.belongsTo(User);
    await User.hasOne(Airline);
    await Token.belongsTo(User);
    await Document.belongsTo(User);
    await User.hasOne(Document);
    await BookedSegment.belongsTo(Ticket);
    await Airline.hasMany(Config);
}
