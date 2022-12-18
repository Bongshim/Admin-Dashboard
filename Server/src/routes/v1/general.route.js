const express = require('express');
const {generalController} = require('../../controllers')

const router = express.Router();

router.get("/user/:id", generalController.getUser)

module.exports = router;