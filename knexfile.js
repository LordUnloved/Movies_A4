const path = require("path");

require("dotenv").config();

const {
   DEVELOPMENT_DATABASE_URL = "postgres://oerlmerv:TwNTB-n0vsAfll_czxfXvrE5zW9tBXTS@manny.db.elephantsql.com/oerlmerv",
 } = process.env;


module.exports = {
  development: {
    client: "postgresql",
    connection: DEVELOPMENT_DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: "postgresql",
    connection: DEVELOPMENT_DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};
