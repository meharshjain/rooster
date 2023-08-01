var mongoose=require("mongoose");

var orderSchema=new mongoose.Schema({
    userid:String,
    storeid:String,
    products:{type:[{
        "product": String,
        "quantity": String,
        "price": String
    }],default:[{
        "product": "nul",
        "quantity": "nul",
        "price": "nul"
    }]},
    message:{type:String,default:"nul"},
    status:{type:String,default:"notposted"},
    subtotal:{type:String,default:"0"},
    paymentstatus:{type:String,default:"pending"},
    createdAt:String
}); 
var order= mongoose.model("order",orderSchema);
module.exports =mongoose.model("order",orderSchema);