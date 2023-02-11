const cors = require("cors");
const express = require("express");
const logger = require('morgan')
const server = express();
const config = require('./config/index') 

server.use(cors())
server.use(logger('dev'));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());


server.listen(config.serverSettings.port, () => {
    console.log(`---${config.name} Service ---`)
    console.log(`Connecting to ${config.name} repository...`)
    console.log(`Open Service By Port ${config.serverSettings.port} Success`);
    require('./routes')(server)
});


// Graceful shutdown
process.on('SIGTERM', () => {

    console.log(`Closing ${config.name} Service.`)
    server.close((err) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }

        console.log('Server closed.')

       
    })
})

module.exports = server