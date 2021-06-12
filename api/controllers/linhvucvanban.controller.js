const { Op } = require("sequelize");

const db = require('../models/database');

function themLinhVucVanBan(req, res){
    const linhvucvanban = {
        tenLinhVucVanBan :  req.body.tenLinhVucVanBan
    };
    db.linhvucvanban.create(linhvucvanban).then(data => {
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Them khong thanh cong"
        });
    });
}

function xuatTatCaLinhVucVanBan(req, res){
    db.linhvucvanban.findAll().then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Khong the xuat tat ca"
        });
    });
}

module.exports = {themLinhVucVanBan,xuatTatCaLinhVucVanBan};
