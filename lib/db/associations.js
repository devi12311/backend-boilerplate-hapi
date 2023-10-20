module.exports = async (models) => {
    const { User, Traveler, Airline, Token, Ticket, Document, BookedSegment } = models;

    // inject all models associations
    await Traveler.belongsTo(User);

    await Ticket.belongsTo(Traveler)
    await Airline.belongsTo(User);
    await Token.belongsTo(User);
    await Document.belongsTo(User);
    await BookedSegment.belongsTo(Ticket);
}
