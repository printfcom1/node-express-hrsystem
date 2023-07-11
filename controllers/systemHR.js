const config = require("../config/index");
const moment = require("moment");
const db = require("../schema/schema");
var generator = require("generate-password");

exports.GetPassword = async function (req, res, next) {
  const { userName } = req.body;
  try {
    const passwordapi = generator.generate({ length: 15, numbers: true });
    const user = await db.User.findOneAndUpdate(
      { userName: userName },
      { $set: { password: passwordapi } },
      { new: true }
    );

    if (user !== null) {
      res.send(200, { password: user.password });
      return;
    } else {
      res.send(400, { message: "Can not find user" });
      return;
    }
  } catch (err) {
    res.send(500, { message: err.message });
    return;
  }
};

exports.GetDataEmployeeAll = async function (req, res, next) {
  try {
    const employee = await db.Employee.find();
    if (employee.length !== 0) {
      res.send(200, employee);
      return;
    } else {
      res.send(400, { message: "Can not find user" });
      return;
    }
  } catch (err) {
    res.send(500, { message: err.message });
    return;
  }
};

exports.GetDataEmployee = async function (req, res, next) {
  const employee_id = req.params.employee_id;
  const name = req.params.name;
  try {
    const employee = await db.Employee.findOne({
      $or: [{ employee_id: Number(employee_id) }, { name: name }],
    });
    if (employee !== null) {
      res.send(200, employee);
      return;
    } else {
      res.send(400, { message: "Can not find user" });
      return;
    }
  } catch (err) {
    res.send(500, { message: err.message });
    return;
  }
};

exports.DeleteDataEmployee = async function (req, res, next) {
  const { employeeId } = req.body;

  try {
    const employee = await db.Employee.findOneAndDelete({
      employeeId: employeeId,
    });
    if (employee) {
      res.send(200, employee);
      return;
    } else {
      res.send(400, { message: "Can not find user" });
      return;
    }
  } catch (err) {
    res.send(500, { message: err.message });
    return;
  }
};

exports.AddDataEmployee = async function (req, res, next) {
  const { employeeId, name, salary, position, startWork } = req.body;

  try {
    const employee = db.Employee({
      employeeId: employeeId,
      name: name,
      salary: salary,
      position: position,
      startWork: new Date(startWork),
    });
    await employee.save();
    res.send(200, employee);
    return;
  } catch (err) {
    res.send(500, { message: err.message });
    return;
  }
};

exports.EditDataEmployee = async function (req, res, next) {
  const { employeeId, name, salary, position } = req.body;
  try {
    const employee = await db.Employee.findOneAndUpdate(
      { employeeId: employeeId },
      {
        $set: {
          name: name,
          salary: salary,
          position: position,
        },
      },
      {
        new: true,
      }
    );
    if (employee) {
      res.send(200, employee);
      return;
    } else {
      res.send(400, { message: "Can not find employee" });
      return;
    }
  } catch (err) {
    res.send(500, { message: err.message });
    return;
  }
};
