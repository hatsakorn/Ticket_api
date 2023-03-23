require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notFoundMiddleware = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");
const authRoute = require("./routes/authRoute");
const ticketRoute = require("./routes/ticketRoute");
// const { sequelize } = require("./models");
const app = express();

app.use(cors());
app.use(express.json());
// sequelize.sync({ force: true });
app.use("/", authRoute);
app.use("/ticket", ticketRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log({ message: `Server is running on port ${port}` })
);
