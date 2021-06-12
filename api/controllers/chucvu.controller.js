const { Op } = require("sequelize");

const db = require('../models/database');

function themChucVu(req, res){
    const chucVu = {
        tenChucVu :  req.body.tenChucVu
    };
    db.chucvu.create(chucVu).then(data => {
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Them khong thanh cong"
        });
    });
}

function timChucVuTheoTen(req, res){
    const tenChucVu = req.params.tenChucVu;
    db.chucvu.findOne({
        where : {tenChucVu : tenChucVu}
    }).then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Khong Tim Thay"
        });
    });
}

function xuatTatCaChucVu(req, res){
    db.chucvu.findAll().then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Khong the xuat tat ca"
        });
    });
}

function capNhatChucVu(req, res) {
    const id = req.params.id;
    db.chucvu.update(req.body,{
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

module.exports = {themChucVu,timChucVuTheoTen,capNhatChucVu,xuatTatCaChucVu};
