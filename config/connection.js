const Sequelize = require("sequelize");
require("dotenv").config();

// sequelize connection to db
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: "127.0.0.1",
      dialect: "mysql",
      port: process.env.PORT || 3306,
    });

module.exports = sequelize;