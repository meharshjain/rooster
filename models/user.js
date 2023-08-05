import  mongoose from "mongoose";
import  passportLocalMongoose from "passport-local-mongoose";
import  pasportLocal from "passport-local";

var UserSchema = new mongoose.Schema({
  profilepic: String,
  firstname: String,
  lastname: String,
  number: String,
  email: String,
  dob: String,
  currlocation: String,
  IP: String,
  address: { type: String, default: "nul" },
  cartid: { type: String, default: "nul" },
  gender: String,
  username: String,
  password: String,
  createdAT: String,
  sellerId: { type: String, default: "nul" },
  IsSeller: { type: String, default: "false" },
  TwoStepAuth: { type: Boolean, default: false },
  OldPassword: { type: Boolean, default: false },
  IsPhoneVerified: { type: Boolean, default: false },
  IsEmailVerified: { type: Boolean, default: false },
  paid: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
});
UserSchema.plugin(passportLocalMongoose);
export default mongoose.model("User", UserSchema);
