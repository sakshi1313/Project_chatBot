const express = require("express");
const router = express.Router();

const controllerAPI = require("../controllers/controllersAPI");

router.route("/:q").get(controllerAPI.results);
module.exports = router;
