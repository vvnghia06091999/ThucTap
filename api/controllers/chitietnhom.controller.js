const { Op } = require("sequelize");

const db = require('../models/database');

function themChiTietNhom(req, res){
    const chiTietNhom = {
        idNhom :  req.body.idNhom,
        idNguoiDung : req.body.idNguoiDung
    };
    db.chitietnhom.create(chiTietNhom).then(data => {
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Them khong thanh cong"
        });
    });
}

function timChiTietNhomTheoIDNhom(req, res){
    const idNhom = req.params.idNhom;
    db.chitietnhom.findAll({
        where : {idNhom : idNhom}
    }).then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Khong Tim Thay"
        });
    });
}
function xoaChiTietNhom(req, res){
    const idNhom = req.params.idNhom;
    const idNguoiDung = req.params.idNguoiDung;
    db.chitietnhom.destroy({where: {
        [Op.and]: [
          {idNhom: idNhom},
          {idNguoiDung: idNguoiDung}
        ]
      }}).then(num => {
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


module.exports = {themChiTietNhom,timChiTietNhomTheoIDNhom,xoaChiTietNhom};
