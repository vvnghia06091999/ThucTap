const { Op } = require("sequelize");

const db = require('../models/database');

function themDonVi(req, res){
    const donVi = {
        tenDonVi : req.body.tenDonVi
    };
    db.donvi.create(donVi).then(data => {
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Them khong thanh cong"
        });
    });
}
function xoaDonVi(req, res){
    const id = req.params.id;
    db.donvi.destroy({
        where : {id : id}
    }).then(num =>{
        if(num == 1){
            res.send({
                message : "Xoa thanh cong"
            })
        }else{
            res.send({
                message : "Xoa khong thanh cong"
            })
        }
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Khong the xoa"
        })
    })
}

function timDonViTheoID(req, res) {
    const id = req.params.id;
    db.donvi.findOne({
        where : {id : id}
    }).then(data => {
        res.send(data)
    }).catch(err =>{
        res.status(500).send({
            message : err.message ||"Khong tim thay"
        })
    })
}

function xuatTatCaDonVi(req, res) {
    db.donvi.findAll().then(data => {
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "Khong the xuat"
        })
    })
}



module.exports = {themDonVi,xoaDonVi,timDonViTheoID,xuatTatCaDonVi};
