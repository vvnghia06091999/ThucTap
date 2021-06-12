const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize){
    const attributes = {
        tenTaiKhoan : {type: DataTypes.STRING},
        matKhau : {type: DataTypes.STRING}
    };
    return sequelize.define('TaiKhoan',attributes);
};