const Store = require('../../schemas/store');

module.exports = (client) => {
    client.getStore = async (storeType) => {
        const storedStore = await Store.findOne({ storeType: storeType });
        
        if (!storedStore) {
            return false;
        } else return storedStore;
    }
}