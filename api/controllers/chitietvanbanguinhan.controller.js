const { Op } = require("sequelize");

const db = require('../models/database');

function themChiTietVanBanGuiNhan(req, res){
    const chiTietVanBanGuiNhan = {
        idNguoiNhan :  req.body.idNguoiNhan,
        idVanBanGuiNhan : req.body.idVanBanGuiNhan,
        vaiTro :  req.body.vaiTro
    };
    db.chitietvanbanguinhan.create(chiTietVanBanGuiNhan).then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Them khong thanh cong"
        });
    });
}
function timVanBanGuiNhanTheoNguoiNhan(req, res){
    const idNguoiNhan = req.params.idNguoiNhan;
    db.chitietvanbanguinhan.findAll({
        where : {idNguoiNhan : idNguoiNhan},
    }).then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Khong Tim Thay"
        });
    });
}

function timVanBanGuiNhanTheoIDVanBanGuiNhan(req, res){
    const idVanBanGuiNhan = req.params.idVanBanGuiNhan;
    db.chitietvanbanguinhan.findAll({
        where : {idVanBanGuiNhan : idVanBanGuiNhan}
    }).then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Khong Tim Thay"
        });
    })
}

function capNhatChiTietVanBanGuiNhan(req, res){
    const idVanBanGuiNhan = req.params.idVanBanGuiNhan;
    const idNguoiNhan = req.params.idNguoiNhan;
    db.chitietvanbanguinhan.update(req.body,{
        where : {
            [Op.and]: [
                {idNguoiNhan: idNguoiNhan},
                {idVanBanGuiNhan: idVanBanGuiNhan}
              ]
        }
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

module.exports = {themChiTietVanBanGuiNhan,capNhatChiTietVanBanGuiNhan,timVanBanGuiNhanTheoIDVanBanGuiNhan,timVanBanGuiNhanTheoNguoiNhan};