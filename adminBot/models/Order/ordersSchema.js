const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    username : String,
    chatId : String,
    items : {
        type : [
            {   
                link : String,
                category : String,
                title : String,
                size : String,
                status1 : String,
                status2 : String,
                poizonPrice : Number,
                course : Number,
                drop : Number,
                Alex : Number,
                profit : Number,
                value : Number,
            }
        ]
    }
},{timestamps: true})
