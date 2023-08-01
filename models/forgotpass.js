var mongoose=require("mongoose");

var forgotpassSchema=new mongoose.Schema({
    username:String,
    userid:String,
    code: String,
    validfrom:String,
    validtill:String,
    status:{type:Boolean,default:true}, 
}); 
var forgotpass= mongoose.model("forgotpass",forgotpassSchema);
module.exports =mongoose.model("forgotpass",forgotpassSchema);