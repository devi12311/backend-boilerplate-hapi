module.exports = async (models) => {
    const {
        User,
        Traveler,
        Airline,
        Token,
        Ticket,
        Document,
        BookedSegment,
        Offer,
        Roulette,
        LoyaltyProgram
    } = models;

    // inject all models associations
    await Traveler.belongsTo(User);

    await Ticket.belongsTo(Traveler);
    await Airline.belongsTo(User);
    await User.hasOne(Airline);
    await Token.belongsTo(User);
    await Document.belongsTo(User);
    await User.hasOne(Document);
    await BookedSegment.belongsTo(Ticket);
    await Offer.belongsToMany(Roulette, { through: 'rouletteOffers' });
    await Roulette.belongsToMany(Offer, { through: 'rouletteOffers' });
    await Airline.hasMany(LoyaltyProgram);
    await LoyaltyProgram.belongsToMany(Offer, { through: 'loyaltyProgramOffers' });
    await Offer.belongsToMany(LoyaltyProgram, { through: 'loyaltyProgramOffers' });
}
