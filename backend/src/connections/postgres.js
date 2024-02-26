const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.POSTGRES_URL);

const connectPostgresDB = async () => {
  try {
    await sequelize.sync({ force: false });
  } catch (error) {
    console.log(error);
  }
};

const disconnectPostgresDB = async () => {
  try {
    await sequelize.sync();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sequelize,
  connectPostgresDB,
  disconnectPostgresDB,
};
