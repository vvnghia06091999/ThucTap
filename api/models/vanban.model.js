const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize){
    const attributes = {
        trichYeu : {type: DataTypes.STRING},
        ngayBanHanh : {type: DataTypes.DATEONLY},
        soKyHieu : {type: DataTypes.STRING},
        capDo : {type: DataTypes.STRING},
        baoMat : {type: DataTypes.STRING},
        soDen : {type: DataTypes.STRING},
        hanXuLy : {type: DataTypes.DATEONLY},
        trangThai : {type: DataTypes.STRING},
        file : {type: DataTypes.STRING},
        idLanhDao : {type: DataTypes.INTEGER,allowNull: false, references: {
            model: 'NguoiDungs',
            key: 'id'
        }},
        idLoaiVanBan : {type: DataTypes.INTEGER,allowNull: false, references: {
            model: 'LoaiVanBans',
            key: 'id'
        }},
        idLinhVucVanBan : {type: DataTypes.INTEGER,allowNull: false, references: {
            model: 'LinhVucVanBans',
            key: 'id'
        }},
        idNguoiTao : {type: DataTypes.INTEGER,allowNull: false, references: {
            model: 'NguoiDungs',
            key: 'id'
        }}
    };
    return sequelize.define('VanBan',attributes);
}