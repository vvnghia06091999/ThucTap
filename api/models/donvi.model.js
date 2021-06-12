const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize){
    const attributes = {
        tenDonVi : {type: DataTypes.STRING}
    };
    return sequelize.define('DonVi',attributes);
}