const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
  
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.taikhoan = require('./taikhoan.model')(sequelize);
db.chucvu = require('./chucvu.model')(sequelize);
db.donvi = require('./donvi.model')(sequelize);
db.phongban = require('./phongban.model')(sequelize);
db.nguoidung = require('./nguoidung.model')(sequelize);
db.nhom = require('./nhom.model')(sequelize);
db.chitietnhom = require('./chitietnhom.model')(sequelize);
db.loaivanban = require('./loaivanban.model')(sequelize);
db.linhvucvanban = require('./linhvucvanban.model')(sequelize);
db.vanban = require('./vanban.model')(sequelize);
db.vanbanguinhan = require('./vanbanguinhan.model')(sequelize);
db.vanbanluu = require('./vanbanluu.model')(sequelize);
db.chitietvanbanguinhan = require('./chitietvanbanguinhan.model')(sequelize);

module.exports = db;