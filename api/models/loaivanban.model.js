const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize){
    const attributes = {
        tenLoaiVanBan : {type: DataTypes.STRING}
    };
    return sequelize.define('LoaiVanBan',attributes);
}