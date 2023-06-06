const { Schema, model } = require('mongoose');
const storeSchema = new Schema({
    _id: Schema.Types.ObjectId,
    storeType: String,
    storeList: { type: Object }
  });

module.exports = model("Store", storeSchema, "stores");