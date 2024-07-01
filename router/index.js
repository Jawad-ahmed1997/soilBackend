"use strict";

// Array of route modules
const routes = [
  require("./routes/user"),
  require("./routes/orderDetails"),
  require("./routes/product"),
  require("./routes/categories"),
  require("./routes/review"),
];
// Exporting router function
module.exports = function router(app, db) {
  // Iterate through each route module
  return routes.forEach((route) => {
     // Initialize each route with the Express app and database
    route(app, db);
  });
};
