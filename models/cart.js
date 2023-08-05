import mongoose from "mongoose";

var cartSchema=new mongoose.Schema({
    user:String,
    store:{type:String,default:"nul"},
    promo: {type:String,default:"nul"},
    deliveryType:{type:String,default:"nul"},
    deliveryFees:{type:String,default:"nul"},
    totalAmt:{type:String,default:"0"},
    products:{type:[{
        "product": String,
        "quantity": String,
        "price": String
    }],default:[{
        "product": "nul",
        "quantity": "nul",
        "price": "0"
    }]},
    totalitem:{type:String,default:"nul"},
    deliveryAddress:{type:String,default:"nul"},
}); 
var cart= mongoose.model("cart",cartSchema);
export default mongoose.model("cart",cartSchema);

