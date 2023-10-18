module.exports = async (models) => {
    const { User, Organization, Token, Cluster } = models;

    // inject all models associations
    await Token.belongsTo(User);
}
