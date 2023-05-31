module.exports = {
    timeStart: function (time, userId) {
        console.log(userId, time)
        setTimeout(() => {
            
        }, time - new Date().getTime())
    }
}