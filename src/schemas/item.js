const { Schema, model } = require('mongoose');
const itemsSchema = new Schema({
    _id: Schema.Types.ObjectId,
    itemType: String,
    itemList: {
      background: {},
      hiddenitem: {},
      guildlogo: {},
      profileborder: {},
      profilenamebar: {},
      achievement: {},
      profileborderfilter: {}
    }
  });

module.exports = model("Item", itemsSchema, "items");