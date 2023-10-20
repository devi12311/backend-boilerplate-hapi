module.exports = async (models) => {
    const { User, Token, Airline, Document, Ticket, BookedSegment } = models;

    await Airline.belongsTo(User);
    await Token.belongsTo(User);
    await Document.belongsTo(User);
    await BookedSegment.belongsTo(Ticket);
}
