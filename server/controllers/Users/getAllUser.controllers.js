const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");

const { StatusCode } = require("../utils/constants.js");
const { jsonGenerate } = require("../utils/helpers.js");

const getAllUser = async (req, res) => {};

module.exports = getAllUser;
