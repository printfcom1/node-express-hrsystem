const config = require('../config/index')
const moment = require('moment')
const client = require('../config/indexDB')
var generator = require('generate-password');



exports.GetPassword = async function (req, res, next){
  const userName = req.body.user_name
  try{
    await client.connect();
    const connectDB = client.db(config.dbSettings.db)
      const resultUser = await connectDB.collection("login").findOne({"user_name":userName});
  if (resultUser !== null){
    let passwordapi =  generator.generate({length: 15,numbers: true});
    const updatePassword = await connectDB.collection("login").updateOne(
          {"user_name":userName},
          { $set: {password: passwordapi}});
    res.send(200,{"password": passwordapi})
    return; 
  }else{
    res.send(400,{"message": "Can not find user"})
    return;
  }
  }catch(err){
    res.send(500,{ "message": err.message})
    return
  }

}


exports.GetDataEmployeeAll = async function (req, res, next){

  try{
    await client.connect();
    const connectDB = client.db(config.dbSettings.db)
      const resultEmployee = await connectDB.collection("data_employee").find().toArray();
  if (resultEmployee.length !== 0){
    res.send(200,resultEmployee)
    return; 
  }else{
    res.send(400,{"message": "Can not find user"})
    return;
  }
  }catch(err){
    res.send(500,{ "message": err.message})
    return
  }
}


exports.GetDataEmployee = async function (req, res, next){
  const employee_id = req.params.employee_id
  const name = req.params.name
  try{
    await client.connect();
    const connectDB = client.db(config.dbSettings.db)
      const resultEmployee = await connectDB.collection("data_employee").findOne({ $or: [ { employee_id: Number(employee_id) }, { name: name } ] });
  if (resultEmployee !== null){
    res.send(200,resultEmployee)
    return; 
  }else{
    res.send(400,{"message": "Can not find user"})
    return;
  }
  }catch(err){
    res.send(500,{ "message": err.message})
    return
  }
}


exports.DeleteDataEmployee = async function (req, res, next){
  const employee_id = req.body.employee_id
  const name = req.body.name
  try{
    await client.connect();
    const connectDB = client.db(config.dbSettings.db)
      const resultEmployee = await connectDB.collection("data_employee").findOne({ employee_id: Number(employee_id) }, { name: name } );
  if (resultEmployee !== null){
    let result = await connectDB.collection('data_employee').deleteOne(
                                  { employee_id : Number(employee_id) }, );
  
    res.send(200,{"message": "Delete data employee success."})
    return; 
  }else{
    res.send(400,{"message": "Can not find user"})
    return;
  }
  }catch(err){
    res.send(500,{ "message": err.message})
    return
  }
}


exports.AddDataEmployee = async function (req, res, next){
  const employee_id = req.body.employee_id
  const name = req.body.name
  try{
    await client.connect();
    const connectDB = client.db(config.dbSettings.db)
      const resultEmployee = await connectDB.collection("data_employee").findOne({ $or: [ { employee_id: Number(employee_id) }, { name: name } ] });
  if (resultEmployee === null){
    const resultInsertEmployee = await connectDB.collection("data_employee").insertOne(req.body);
    res.send(200,{"message": "Add data employee success."})
    return; 
  }else{
    res.send(400,{"message": "Information already exists"})
    return;
  }
  }catch(err){
    res.send(500,{ "message": err.message})
    return
  }
}

exports.EditDataEmployee = async function (req, res, next){
  const employee_id = req.body.employee_id
  const name = req.body.name
  const salary = req.body.salary
  const position = req.body.position
  try{
    await client.connect();
    const connectDB = client.db(config.dbSettings.db)
      const resultEmployee = await connectDB.collection("data_employee").findOne({ $or: [ { employee_id: Number(employee_id) }, { name: name } ] });
  if (resultEmployee !== null){
    const resultInsertEmployee = await connectDB.collection("data_employee").updateOne(
                                                        { employee_id: Number(employee_id) },
                                                        { $set: {name: name,
                                                                salary: Number(salary),
                                                                position : position}});
    res.send(200,{"message": "Edit data employee success."})
    return; 
  }else{
    res.send(400,{"message": "Can not find employee"})
    return;
  }
  }catch(err){
    res.send(500,{ "message": err.message})
    return
  }
}