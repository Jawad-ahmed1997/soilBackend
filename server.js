const express = require("express");
db = require("./config/db"),
bodyParser = require("body-parser"),
db = require("./config/db"),
env = require("./config/env"),
router = require("./router/index"),
cors = require("cors")

app = express()
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use((req, res, next) => {
   res.header("Content-Type", "application/json");
   next();
 });
 router(app, db);
 const PORT = 3002;
 db.sequelize
 .sync()
 .then(() => {
   app.listen(PORT, () => {
     console.log("Express listening on port:", PORT);
   });
 })
 .catch((error) => console.log(error));