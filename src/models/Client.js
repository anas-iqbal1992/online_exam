var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var clientSchema = new Schema({
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
  addresses: [
    {
      address1: { type: String,required: true },
      address2: { type: String },
    },
  ],
  board:{
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});
clientSchema.path('email').validate(async (value) => {
  const emailCount = await mongoose.models.Client.countDocuments({email: value });
  return !emailCount;
}, 'Email already exists');
module.exports = mongoose.model('Client',clientSchema);
