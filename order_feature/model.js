const mongoose=require('mongoose')
const Schema=mongoose.Schema
const orderScema=new Schema({
        items: { type: Object, required: true },
    paymentType: { type: String, default: 'COD'},
    customerREF: { type: String,required:true},

    status: { type: String, default: 'order_placed'},
}, { timestamps: true })//storing time 

module.exports=mongoose.model('order',orderScema);