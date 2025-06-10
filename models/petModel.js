const mongoose = require ("mongoose")

const {Schema} = mongoose

const petSchema = new Schema ({
    name: {
        type: String,
        required: true,
        trim:true,
    },

    species:{
        type: String,
        required: true,
        trim:true,
    },

    age:{
        type: Number,
        required: true,
    },

    image:{
        type:String,
    }

})

const Pet = mongoose.model ("Pet", petSchema)

module.exports = Pet