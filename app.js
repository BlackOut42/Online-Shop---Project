const path = require("path");
const express = require("express");
const csrf = require("csurf");
const expressSession = require("express-session");

const addCsrfMiddleware = require("./middleware/csrf-Token");//csrf addition middleware.
const errorHandleMiddleware = require("./middleware/error-handler");//custom error handling middleware
const createSessionConfig = require("./config/session-config"); // session config for authentication
const authRoutes = require("./routes/auth-routes");
const db = require("./data/database");

const app = express();

app.set("view engine", "ejs"); //view engine switch to ejs
app.set("views", path.join(__dirname, "views")); // setting views path

const port = 3000;

app.use(express.static("public")); // serving staticly the resources available for public.
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));//has to be before usage of csrf(below).
app.use(csrf()); // has to be executed before redirection to routes(below)
app.use(addCsrfMiddleware);


app.use(authRoutes);

app.use(errorHandleMiddleware);//last thing to use by express so we could catch all incoming errors.

db.connectToDatabase()
  .then(function () {
    app.listen(port, () =>
      console.log("> Server is up and running on port : " + port)
    );
  }) // end of promise
  .catch(function (error) {
    console.log("Could not connect to DB!");
    console.log(error);
  });
