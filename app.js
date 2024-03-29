const express = require("express");
const bodyParser = require("body-parser");
const eventRoute = require("./routes/eventRoute");
const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(eventRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});









// const express = require("express");
// const mysql = require("mysql");
// const app = express();
// const bodyParser = require("body-parser");
// const axios = require("axios");
// const moment = require("moment");
// const PORT = 3000;


// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Bhanu@123",
//   database: "events_db",
// });

// app.use(bodyParser.json());

// app.post("/events/create", (req, res) => {
//   const { eventName, cityName, date, time, latitude, longitude } = req.body;
//   const sql =
//     "INSERT INTO backend (event_name, city_name, date, time, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)";
//   connection.query(
//     sql,
//     [eventName, cityName, date, time, latitude, longitude],
//     (err, result) => {
//       if (err) {
//         console.error(err, "inserting error");
//         res.status(500).json({ error: "Internal server error" });
//       } else {
//         res.status(201).json({ message: "Event created successfully" });
//       }
//     }
//   );
// });

// app.get("/events/find", async (req, res) => {
//   const latitude = req.query.latitude;
//   const longitude = req.query.longitude;
//   const date = req.query.date;
//   const page = req.query.page || 1;
//   const limit = 10;
//   const skip = (page - 1) * limit;
//  const endDate = moment(date).add(14, 'days').format('YYYY-MM-DD');

//   try {
//     const countSql =
//       "SELECT COUNT(*) as totalEvents FROM events_db.backend WHERE date BETWEEN ? AND ?";
//     console.log(date,endDate);
//     const r = await new Promise ((resolve, reject)=>{
//       connection.query (countSql,[date,endDate], (err, result) => {
//         if(err){
//           console.log(err)
//           reject(err)
//         }
//         else{
//           console.log(result,"oo");
//           resolve(result[0].totalEvents)
//         }
//       })
//     })
  
//     console.log("s",r  );
//     const totalPages = Math.ceil(r / limit);

//     const sql =
//       "SELECT * FROM backend WHERE date BETWEEN ? AND DATE_ADD(?, INTERVAL 14 DAY) ORDER BY date LIMIT ? OFFSET ?";
//     const events = await new Promise((resolve, reject) => {
//       connection.query(sql, [date, endDate, limit, skip], (err, result) => {
//         if (err) {
//           console.error(err);
//           reject("Internal server error");
//         } else {
//           resolve(result);
//         }
//       });
//     });

//     const eventDetails = await Promise.all(
//       events.map(async (event) => {
//         const weatherResponse = await axios.get(
//           `https://gg-backend-assignment.azurewebsites.net/api/Weather?code=KfQnTWHJbg1giyB_Q9Ih3Xu3L9QOBDTuU5zwqVikZepCAzFut3rqsg==&city=${encodeURIComponent(
//             event.city_name
//           )}&date=${date}`
//         );
//         const distanceResponse = await axios.get(
//           `https://gg-backend-assignment.azurewebsites.net/api/Distance?code=IAKvV2EvJa6Z6dEIUqqd7yGAu7IZ8gaH-a0QO6btjRc1AzFu8Y3IcQ==&latitude1=${latitude}&longitude1=${longitude}&latitude2=${event.latitude}&longitude2=${event.longitude}`
//         );

//         const weatherData = weatherResponse.data;
//         console.log(weatherData,"cc");
//         const weatherKey = Object.keys(weatherData)[0];
//         console.log(weatherKey,"bb");
//         const weather = weatherData[weatherKey];
//         console.log(weather,"yy");
//         const distance = distanceResponse.data.distance;
//         console.log(distance,"aa");

//         return {
//           event_name: event.event_name,
//           city_name: event.city_name,
//           date: event.date,
//           weather,
//           distance_km: distance,
//         };
//       })
//     );

//     const responseObj = {
//       events: eventDetails,
//       page,
//       pageSize: limit,
//       totalEvents:r,
//       totalPages:totalPages
//     };
//     console.log(eventDetails,"ee");
//     console.log(responseObj,"rr");
//     res.json(responseObj);
//   } catch (error) {
//     console.error("error", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });









