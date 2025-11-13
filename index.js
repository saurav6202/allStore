require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set('view cache', false);

app.use("/", require("./routes/static"));
app.use("/owner", require("./routes/owner"));

app.get("/home", (req, res) => {
    return res.render("home");
})

app.get("/", (req, res) => {
    return res.render("owner/owner");
})

const port = 5000;
app.listen(port, () => console.log(`server is running on http://localhost:${port}`));