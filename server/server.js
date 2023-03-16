const express = require("express");
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser')

require("./config/mongoose.config");
require('dotenv').config();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser())
app.use(express.json(), express.urlencoded({ extended: true }));

const animeRoutes = require("./routes/anime.routes");
const userRoutes = require("./routes/user.routes")
animeRoutes(app);
userRoutes(app);

app.listen(8000, () => console.log("The server is all fired up on port 8000"));