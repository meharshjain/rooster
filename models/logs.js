var mongoose=require("mongoose");

var logSchema=new mongoose.Schema({
    username:String,
    userid:String,
    data1: String,
    data2:String,
    ip:String,
}); 
var log= mongoose.model("log",logSchema);
module.exports =mongoose.model("log",logSchema);