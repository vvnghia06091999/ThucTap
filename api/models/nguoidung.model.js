const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize){
    const attributes = {
        tenNguoiDung : {type: DataTypes.STRING},
        email : {type: DataTypes.STRING},
        photo : {type: DataTypes.STRING},
        soDienThoai: {type: DataTypes.STRING},
        idTaiKhoan : {type: DataTypes.INTEGER,allowNull: false, references: {
            model: 'TaiKhoans',
            key: 'id'
        }},
        idChucVu : {type: DataTypes.INTEGER,allowNull: false, references: {
            model: 'ChucVus',
            key: 'id'
        }},
        idPhongBan : {type: DataTypes.INTEGER,allowNull: false, references: {
            model: 'PhongBans',
            key: 'id'
        }}
    };
    return sequelize.define('NguoiDung',attributes);
}