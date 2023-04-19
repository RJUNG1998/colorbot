module.exports = {
    priceCommas: function (price) {
        var parts = price.toString().split(".");
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    }
}