
const systemHR = require('../controllers/systemHR.js');
const { Authentication } = require('../untils')

module.exports = (server) => {
    server.post('/systemHR/GetPassword',systemHR.GetPassword)
    server.get('/systemHR/GetDataEmployeeAll',Authentication.isAuthen,systemHR.GetDataEmployeeAll)
    server.get('/systemHR/GetDataEmployee/:employee_id/:name',Authentication.isAuthen,systemHR.GetDataEmployee)
    server.post('/systemHR/DeleteDataEmployee',Authentication.isAuthen,systemHR.DeleteDataEmployee)
    server.post('/systemHR/AddDataEmployee',Authentication.isAuthen,systemHR.AddDataEmployee)
    server.post('/systemHR/EditDataEmployee',Authentication.isAuthen,systemHR.EditDataEmployee)
} 