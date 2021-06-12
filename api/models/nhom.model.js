const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize){
    const attributes = {
        tenNhom : {type: DataTypes.STRING},
        idNguoiTao: {type: DataTypes.INTEGER,allowNull: false, references: {
            model: 'NguoiDungs',
            key: 'id'
        }}
    };
    return sequelize.define('Nhom',attributes);
}