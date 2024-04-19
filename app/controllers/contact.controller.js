const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = (req, res) => {
    res.send({ message: "create handler"});
};

exports.findAll = (req, res) => {
    res.send({ message: "findAll handler"});
};

exports.findOne = (req, res) => {
    res.send({ message: "findOne handler"});
};

exports.update = (req, res) => {
    res.send({ message: "update handler"});
};

exports.delete = (req, res) => {
    res.send({ message: "delete handler"});
};

exports.deleteAll = (req, res) => {
    res.send({ message: "deleteAll handler"});
};

// exports.checkOrder = (req, res) => {
//     res.send({ message: "checkOrder handler"});
// };