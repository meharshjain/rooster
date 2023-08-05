import mongoose from "mongoose";

var forgotpassSchema=new mongoose.Schema({
    username:String,
    userid:String,
    code: String,
    validfrom:String,
    validtill:String,
    status:{type:Boolean,default:true}, 
}); 
var forgotpass= mongoose.model("forgotpass",forgotpassSchema);
export default mongoose.model("forgotpass",forgotpassSchema);