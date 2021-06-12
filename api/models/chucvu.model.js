const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize){
    const attributes = {
        tenChucVu : {type: DataTypes.STRING}
    };
    return sequelize.define('ChucVu',attributes);
}