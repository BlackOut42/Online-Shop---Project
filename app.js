const path = require("path");
const express = require("express");
const authRoutes = require("./routes/auth-routes");
const app = express();

app.set("view engine", "ejs");//view engine switch to ejs
app.set("views", path.join(__dirname, "views"));// setting views path

const port = 3000;

app.use(express.static("public")); // resources available for public.

app.use(authRoutes);

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
