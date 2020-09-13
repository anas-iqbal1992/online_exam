var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var quetionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    text :true
  },
  answers: [{}],
  status: {type:Number},
  subject_id: { type: Schema.Types.ObjectId, ref: "Subject" },
  reference: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Question", quetionSchema);
