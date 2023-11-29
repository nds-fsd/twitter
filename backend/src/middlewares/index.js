const express = require("express");

const consoleLogType = (req, res, next) => {
  console.log("Request Type:", req.method, "Router Type:", req.baseUrl);
  next();
};

module.exports = {
  consoleLogType,
};
