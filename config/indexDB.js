const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require('../config/index')

const client = new MongoClient(config.dbSettings.url,{ useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = client;