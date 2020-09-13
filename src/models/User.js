var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema  = new Schema({
  ucode: { type: Schema.Types.Decimal128, required: true, unique: true },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/.test(v);
      },
      message: (props) => `${props.value} is not a valid Email!`,
    },
    lowercase: true,
    unique: [true,'Email already exits'],
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: [true, "User phone number required"],
  },
  password:{ type:String,required: true},
  status: {type:Number},
  role:{
    type: String,
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});
userSchema.path('email').validate(async (value) => {
  const emailCount = await mongoose.models.User.countDocuments({email: value });
  return !emailCount;
}, 'Email already exists');
userSchema.path('phone').validate(async function (value) {
  return value.length == 10;
}, 'Invalid Phone Number.');
module.exports = mongoose.model('User', userSchema);
