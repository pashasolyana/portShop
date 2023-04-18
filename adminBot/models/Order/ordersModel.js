const mongoose = require('mongoose')
const schema = require('./ordersSchema')
module.exports = mongoose.model('orders', schema)
