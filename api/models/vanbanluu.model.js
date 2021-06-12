const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize){
    const attributes = {
        idNguoiDung : {type: DataTypes.INTEGER,allowNull: false, references: {
            model: 'NguoiDungs',
            key: 'id'
        }},
        idVanBanGuiNhan  : {type: DataTypes.INTEGER,allowNull: false, references: {
            model: 'VanBans',
            key: 'id'
        }},
        ghiChu : {type : DataTypes.STRING},
        loaiVanBanLuu : {type : DataTypes.STRING}
    };
    return sequelize.define('VanBanLuu',attributes);
}