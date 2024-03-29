const eventModel = require("../model/eventModel");
const moment = require("moment");
const axios = require("axios");
const connection = require("../dataBase/databaseConnection");

async function createEvent(req, res) {
  const eventData = req.body;
  if (
    !eventData ||
    !eventData.eventName ||
    !eventData.cityName ||
    !eventData.date ||
    !eventData.time ||
    !eventData.latitude ||
    !eventData.longitude
  ) {
    return res
      .status(400)
      .json({
        error:
          "Required all fields(eventName,cityName,date,time,latitude,longitude)",
      });
  }

  try {
    await eventModel.createEvent(eventData);
    res.status(201).json({ message: "Event created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function findEvents(req, res) {
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  const date = req.query.date;
  const page = req.query.page || 1;
  const limit = 10;
  const endDate = moment(date).add(14, "days").format("YYYY-MM-DD");

  if (
    !latitude ||
    !longitude ||
    !date ||
    !moment(date, "YYYY-MM-DD", true).isValid()
  ) {
    return res
      .status(400)
      .json({ error: "Required all fields(latitude,longitude,date)" });
  }

  try {
    const countSql =
      "SELECT COUNT(*) as totalEvents FROM events_db.backend WHERE date BETWEEN ? AND ?";
    const data = await new Promise((resolve, reject) => {
      connection.query(countSql, [date, endDate], (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(result, "oo");
          resolve(result[0].totalEvents);
        }
      });
    });

    console.log("s", data);
    const totalPages = Math.ceil(data / limit);

    if (page > totalPages || page < 1) {
      return res
        .status(400)
        .json({
          error: "There is no events in this page or Page number exceeded",
        });
    }

    const skip = (page - 1) * limit;

    const sql =
      "SELECT * FROM backend WHERE date BETWEEN ? AND ? ORDER BY date  LIMIT ? OFFSET ?";
    const events = await new Promise((resolve, reject) => {
      const a = connection.query(
        sql,
        [date, endDate, limit, skip],
        (err, result) => {
          if (err) {
            console.error(err);
            reject("Internal server error");
          } else {
            resolve(result);
          }
        }
      );
      console.log(a.sql);
    });

    const eventDetails = await Promise.all(
      events.map(async (event) => {
        const weatherResponse = await axios.get(
          `https://gg-backend-assignment.azurewebsites.net/api/Weather?code=KfQnTWHJbg1giyB_Q9Ih3Xu3L9QOBDTuU5zwqVikZepCAzFut3rqsg==&city=${encodeURIComponent(
            event.city_name
          )}&date=${date}`
        );
        const distanceResponse = await axios.get(
          `https://gg-backend-assignment.azurewebsites.net/api/Distance?code=IAKvV2EvJa6Z6dEIUqqd7yGAu7IZ8gaH-a0QO6btjRc1AzFu8Y3IcQ==&latitude1=${latitude}&longitude1=${longitude}&latitude2=${event.latitude}&longitude2=${event.longitude}`
        );

        const weatherData = weatherResponse.data;
        console.log(weatherData, "cc");
        const weatherKey = Object.keys(weatherData)[0];
        console.log(weatherKey, "bb");
        const weather = weatherData[weatherKey];
        console.log(weather, "yy");
        const distance = distanceResponse.data.distance;
        console.log(distance, "aa");

        return {
          event_name: event.event_name,
          city_name: event.city_name,
          date: event.date,
          weather,
          distance_km: distance,
        };
      })
    );

    const responseObj = {
      events: eventDetails,
      page,
      pageSize: limit,
      totalEvents: data,
      totalPages: totalPages,
    };
    console.log(eventDetails, "ee");
    console.log(responseObj, "rr");
    res.json(responseObj);
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { createEvent, findEvents };
