const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize){
    const attributes = {
        tenPhongBan : {type: DataTypes.STRING},
        idDonVi : {type: DataTypes.INTEGER,allowNull: false, references: {
            model: 'DonVis',
            key: 'id'
        }}
    };
    return sequelize.define('PhongBan',attributes);
}