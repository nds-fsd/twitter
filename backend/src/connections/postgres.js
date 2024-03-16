const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.POSTGRES_URL);

const connectPostgresDB = async () => {
  await sequelize.sync({ force: false });
};

module.exports = {
  sequelize,
  connectPostgresDB,
};
