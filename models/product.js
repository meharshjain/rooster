var mongoose=require("mongoose");

var productSchema=new mongoose.Schema({
    name:String,
    restid:String,
    type:String,
    description:String,
    pichref: String,
    price:String,
    daysaval:[String],
    deltype:String,
    quantityaval:String,
    preptime:String,
}); 
var product= mongoose.model("product",productSchema);
module.exports =mongoose.model("product",productSchema);