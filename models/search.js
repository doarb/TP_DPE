const mongoose = require("mongoose");

const SearchSchema = new mongoose.Schema({
  id: Number,
  user_id: String,
  parameters: Object,
  result: Array,
  Date: Date,
});

module.exports = mongoose.model("dbo-searches", SearchSchema);
