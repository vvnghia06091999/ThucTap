const { Op } = require("sequelize");

const db = require('../models/database');

function themTaiKhoan(req, res){
    const taiKhoan = {
        tenTaiKhoan :  req.body.tenTaiKhoan,
        matKhau : req.body.matKhau
    };
    db.taikhoan.create(taiKhoan).then(data => {
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Them khong thanh cong"
        });
    });
}

function timTaiKhoanTheoID(req, res){
    const id = req.params.id;
    db.taikhoan.findOne({
        where : {id : id}
    }).then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Khong Tim Thay"
        });
    });
}

function capNhatMatKhau(req, res) {
    const id = req.params.id;
    db.taikhoan.update(req.body,{
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
            message : err.message || "Khong The Cap Nhat Mat Khau id " + id
        });
    });
}

function xuatTatCaTaiKhoan(req, res){
    db.taikhoan.findAll().then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Khong the xuat tat ca"
        });
    });
}

function dangNhap(req, res){
    const {tenTaiKhoan,matKhau} = req.body;
    db.taikhoan.findOne({
        where : {tenTaiKhoan : tenTaiKhoan}
    }).then(data => {
        if(data.matKhau === matKhau){
            res.send(data);
        }else{
            res.status(210).send({
                message : "Sai ten tai khoan hoac mat khau"
            })
        }
    }).catch(err => {
        res.status(210).send({
            message : "Sai ten tai khoan hoac mat khau"
        })
    });
}

module.exports = {themTaiKhoan,timTaiKhoanTheoID,capNhatMatKhau,xuatTatCaTaiKhoan,dangNhap};
