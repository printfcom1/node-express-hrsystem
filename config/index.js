module.exports = {
    name: 'System HR',
    version: '1.0.0',
    serverSettings: {
        port: process.env.PORT || 3000
    },dbSettings: {
        db: process.env.DB || "system_hr",
        server: process.env.DB_SERVER || "systemHR:P%40ssw0rdsystem@cluster0.bku4jpw.mongodb.net/?retryWrites=true&w=majority",
        get url (){
            return `mongodb+srv://${this.server}`        
        }
    },
}
