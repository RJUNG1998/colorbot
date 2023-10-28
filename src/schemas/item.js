const { Schema, model } = require('mongoose');
const itemsSchema = new Schema({
    _id: Schema.Types.ObjectId,
    itemType: String,
    itemList: { type: Object }
  });

module.exports = model("Item", itemsSchema, "items");