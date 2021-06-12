const { Op } = require("sequelize");

const db = require('../models/database');

function themLoaiVanBan(req, res){
    const loaivanban = {
        tenLoaiVanBan :  req.body.tenLoaiVanBan
    };
    db.loaivanban.create(loaivanban).then(data => {
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Them khong thanh cong"
        });
    });
}

function xuatTatCaLoaiVanBan(req, res){
    db.loaivanban.findAll().then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Khong the xuat tat ca"
        });
    });
}

module.exports = {themLoaiVanBan,xuatTatCaLoaiVanBan};
