const { Op } = require("sequelize");

const db = require('../models/database');

function themVanBan(req, res){
    const vanBan = {
        trichYeu :  req.body.trichYeu,
        ngayBanHanh : req.body.ngayBanHanh,
        soKyHieu : req.body.soKyHieu,
        capDo : req.body.capDo,
        baoMat : req.body.baoMat,
        soDen : req.body.soDen,
        hanXuLy : req.body.hanXuLy,
        trangThai : req.body.trangThai,
        file : req.body.file,
        idLanhDao : req.body.idLanhDao,
        idLoaiVanBan : req.body.idLoaiVanBan,
        idLinhVucVanBan : req.body.idLinhVucVanBan,
        idNguoiTao : req.body.idNguoiTao
    }
    db.vanban.create(vanBan).then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Them khong thanh cong"
        })
    })
}

function capNhatVanBan(req, res) {
    const id = req.params.id;
    db.vanban.update(req.body,{
        where : {id : id}
    }).then(num =>{
        if(num == 1){
            res.send({
                message : "Cap nhat thanh cong"
            })
        }else{
            res.send({
                message : "Cap nhat khong thanh cong"
            })
        }
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Khong the cap nhat"
        })
    })
}

function timVanBanTheoID(req, res) {
    const id = req.params.id;
    db.vanban.findByPk(id).then(data => {
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Khong the tim thay"
        })
    })
}
function xoaVanBan(req, res){
    const id = req.params.id;
    db.vanban.destroy({
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


module.exports = {themVanBan,capNhatVanBan,timVanBanTheoID,xoaVanBan}



