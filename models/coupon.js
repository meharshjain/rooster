var mongoose=require("mongoose");

var couponSchema=new mongoose.Schema({
    name:String,
    storeid:String,
    condition:String,
    code:String,
    validtill:String,
    maxlimit: String,
    OffMaxAmt:String,
    OffPer:String,
    MinOrder:String,
    MaxOrder:String
}); 
var coupon= mongoose.model("coupon",couponSchema);
module.exports =mongoose.model("coupon",couponSchema);