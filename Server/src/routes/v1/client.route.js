const express = require('express');
const {clientController} = require('../../controllers')

const router = express.Router();

router.get('/products', clientController.getProducts )
router.get('/customers', clientController.getCustomers )
router.get('/transactions', clientController.getTransactions )

module.exports = router;