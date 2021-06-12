const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const app = express();

var corsOptions = {
    origin: process.env.API_CORS
};
  
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Van Nghia Pro." });
});

app.use("/taikhoan",require('./routers/taikhoan.router'));
app.use("/chitietnhom",require('./routers/chitietnhom.router'));
app.use("/chucvu",require('./routers/chucvu.router'));
app.use("/donvi",require('./routers/donvi.router'));
app.use("/linhvucvanban",require('./routers/linhvucvanban.router'));
app.use("/loaivanban",require('./routers/loaivanban.router'));
app.use("/nguoidung",require('./routers/nguoidung.router'));
app.use("/nhom",require('./routers/nhom.router'));
app.use("/phongban",require('./routers/phongban.router'));
app.use("/vanban",require('./routers/vanban.router'));
app.use("/vanbanguinhan",require('./routers/vanbanguinhan.router'));
app.use("/vanbanluu",require('./routers/vanbanluu.router'));
app.use("/chiTietVanBanGuiNhan",require('./routers/chiTietVanBanGuiNhan.router'));

const db = require("./models/database");
db.sequelize.sync();

const PORT = process.env.API_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
