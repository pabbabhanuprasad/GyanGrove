const connection = require('../dataBase/databaseConnection');

async function createEvent(eventData) {
    const { eventName, cityName, date, time, latitude, longitude } = eventData;
    const sql =
        "INSERT INTO backend (event_name, city_name, date, time, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
        connection.query(sql, [eventName, cityName, date, time, latitude, longitude], (err, result) => {
            if (err) {
                console.error(err, "inserting error");
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = { createEvent };


