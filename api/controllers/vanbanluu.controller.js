const { Op } = require("sequelize");

const db = require('../models/database');

function themVanBanLuu(req, res){
    const vanBanLuu = {
        idNguoiDung :  req.body.idNguoiDung,
        idVanBanGuiNhan : req.body.idVanBanGuiNhan,
        ghiChu : req.body.ghiChu,
        loaiVanBanLuu : req.body.loaiVanBanLuu
    };
    db.vanbanluu.create(vanBanLuu).then(data => {
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Them khong thanh cong"
        });
    });
}

function timVanBanLuuTheoNguoiDung(req, res){
    const idNguoiDung = req.params.idNguoiDung;
    db.vanbanluu.findAll({
        where : {idNguoiDung : idNguoiDung}
    }).then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Khong Tim Thay"
        });
    });
}

function xoaVanBanLuu(req, res){
    const id = req.params.id;
    db.vanbanluu.destroy({
        where: 
            {
                id : id
            }
    }).then(num => {
        if (num == 1) {
          res.send({
            message: "Xoa Thanh Cong."
      });} 
        else {
          res.send({
            message: "Xoa That Bai"
        });
    }}).catch(err => {
        res.status(500).send({
          message: err.message || "Khong the xoa "
        });
    });
}



module.exports = {themVanBanLuu,timVanBanLuuTheoNguoiDung,xoaVanBanLuu};
