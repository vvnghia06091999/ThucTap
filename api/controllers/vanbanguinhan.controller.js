const { Op } = require("sequelize");

const db = require('../models/database');

function themVanBanGuiNhan(req, res){
    const vanBanGuiNhan = {
        idNguoiGui :  req.body.idNguoiGui,
        idVanBan : req.body.idVanBan,
        noiDung : req.body.noiDung,
        yKienXuLy : req.body.yKienXuLy,
        trangThai : req.body.trangThai
    };
    db.vanbanguinhan.create(vanBanGuiNhan).then(data => {
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Them khong thanh cong"
        });
    });
}

function timVanBanGuiNhanTheoNguoiGui(req, res){
    const idNguoiGui = req.params.idNguoiGui;
    db.vanbanguinhan.findAll({
        where : {idNguoiGui : idNguoiGui},
    }).then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Khong Tim Thay"
        });
    });
}

function capNhatVanBanGuiNhan(req, res) {
    const id = req.params.id;
    db.vanbanguinhan.update(req.body,{
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
            message : err.message || "Khong The Cap Nhat "
        });
    });
}

function timVanBanGuiNhanTheoID(req, res){
    const id = req.params.id;
    db.vanbanguinhan.findOne({
        where: {id : id}
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message : err.message || "Ko Tim Thay"
        })
    })
}

module.exports = {themVanBanGuiNhan,capNhatVanBanGuiNhan,timVanBanGuiNhanTheoNguoiGui,timVanBanGuiNhanTheoID};
