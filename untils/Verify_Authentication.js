const config = require('../config')
const auth = require('basic-auth')
const connectDB =require('../config/indexDB')
const _ = require('lodash');


module.exports.isAuthen = async (req, res, next) => {
    let credentials = await auth(req)
    if (_.isEmpty(credentials) === false) {
        let authen = await check(credentials.name, credentials.pass)
        
        if (authen === true) {
            next()
        } else {

          res.send(401, {
                "message": "Access denied, incorrect Username or Password."
            })
            return;

        }

    } else {
        res.send(401, {
            "message": "Access denied, incorrect Username or Password."
        })
        return;
    }
    
}



async function check(username, password_api) {
    return new Promise(async (resolve, reject) => {
        
    try {
        console.log(username)
        console.log(password_api)
        let check_password = await connectDB.db(config.dbSettings.db).collection("login").find({user_name:username,password:password_api}).toArray();

            if (check_password.length > 0) {
                
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (err) {
            console.log(err.message)
            resolve(false)
        }
    })
}
