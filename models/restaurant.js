var mongoose=require("mongoose");

var restaurantSchema=new mongoose.Schema({
    coverImage:String,
    profileImage:String,
    name: String,
    owner:String,
    ownerusername:String,
    ownerid:String,
    longitude:String,
    latitude:String,
    DeliveryOpt:String,
    description:String,
    location:String,
    openingtime:String,
    closingtime:String,
    workdays:[String],
    couponid:String
}); 
var restaurant= mongoose.model("restaurant",restaurantSchema);
module.exports =mongoose.model("restaurant",restaurantSchema);