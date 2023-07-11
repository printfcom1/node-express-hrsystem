const mongoose = require("../config/indexDB");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  userName: String,
  password: String,
});

const User = model("users", userSchema);

const employeeSchema = new Schema({
  employeeId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  startWork: {
    type: Date,
    required: true,
  },
});

const Employee = model("Employee", employeeSchema);

module.exports = { User, Employee };
