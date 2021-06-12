const { Op } = require("sequelize");

const db = require('../models/database');

function themNhom(req, res){
    const nhom = {
        tenNhom :  req.body.tenNhom,
        idNguoiTao : req.body.idNguoiTao
    };
    db.nhom.create(nhom).then(data => {
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Them khong thanh cong"
        });
    });
}

function timNhomTheoIDNguoiTao(req, res){
    const idNguoiTao = req.params.idNguoiTao;
    db.nhom.findAll({
        where : {idNguoiTao : idNguoiTao}
    }).then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Khong Tim Thay"
        });
    });
}

function capNhatNhom(req, res) {
    const id = req.params.id;
    db.nhom.update(req.body,{
        where : {id : id}
    }).then(num =>{
        if(num == 1){
            res.send({
                message : "Cap nhat thanh cong"
            });
        }else{
            res.send({
                message : "Cap nhat khong thanh cong"
            })
        }
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Khong The Cap Nhat Nhom"
        });
    });
}

function xoaNhom(req, res){
    const id = req.params.id;
    db.nhom.destroy({
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

module.exports = {themNhom,capNhatNhom,xoaNhom,timNhomTheoIDNguoiTao};
