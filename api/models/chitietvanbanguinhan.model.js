const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize){
    const attributes = {
        idVanBanGuiNhan : {type: DataTypes.INTEGER,allowNull: false,primaryKey: true, references: {
            model: 'VanBanGuiNhans',
            key: 'id'
        }},
        idNguoiNhan : {type: DataTypes.INTEGER,allowNull: false,primaryKey: true, references: {
            model: 'NguoiDungs',
            key: 'id'
        }},
        vaiTro : {type : DataTypes.STRING},
        trangThai : {type: DataTypes.STRING , defaultValue : "Chưa Xem"}
    };
    return sequelize.define('ChiTietVanBanGuiNhan',attributes);
}