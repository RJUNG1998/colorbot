const { Schema, model } = require('mongoose');
const itemsSchema = new Schema({
    _id: Schema.Types.ObjectId,
    itemType: String,
    itemList: {
      background: {
        gray: {
          name: String,
          source: String
        },
        red: {
            name: String,
            source: String
        },
        orange: {
            name: String,
            source: String
        },
        yellow: {
            name: String,
            source: String
        },
        green: {
            name: String,
            source: String
        },
        purple: {
            name: String,
            source: String
        },
        blue: {
            name: String,
            source: String
        },
        boost: {
            name: String,
            source: String
        }
      },
      hiddenitem: {
        brush: {
          name: String,
        }
      },
      guildlogo: {},
      profileborder: {},
      profilenamebar: {},
      achievement: {
        beginner: {
          name: String,
        }
      },
      profileborderfilter: {}
    }
  });

module.exports = model("Item", itemsSchema, "items");