require("dotenv").config();
module.exports = {
  name: "System HR",
  version: "1.0.0",
  serverSettings: {
    port: process.env.PORT || 3000,
  },
  dbSettings: {
    db: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    get url() {
      return `mongodb+srv://${this.server}${this.db}`;
    },
  },
};
