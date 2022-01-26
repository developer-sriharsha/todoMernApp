module.exports = { getCurrentDate }
function getCurrentDate() {
    let date = new Date();
    date.setHours(date.getHours() + 1);
    return date;
}

