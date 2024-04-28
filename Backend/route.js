const express = require('express');
const { check } = require('./Api/signupapi');

const router = express.Router();
router.route("/check").get(check)
module.exports = router;