const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize){
    const attributes = {
        tenLinhVucVanBan : {type: DataTypes.STRING}
    };
    return sequelize.define('LinhVucVanBan',attributes);
}