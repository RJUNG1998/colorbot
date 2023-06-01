const Item = require('../../schemas/item');

module.exports = (client) => {
    client.getItems = async (itemType) => {
        const storedItem = await Item.findOne({ itemType: itemType});
        
        if (!storedItem) {
            return false;
        } else return storedItem;
    }
}