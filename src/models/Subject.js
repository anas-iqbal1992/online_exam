var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var subjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    text :true
  },
  status: {type:Number},
  reference: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Subject", subjectSchema);
