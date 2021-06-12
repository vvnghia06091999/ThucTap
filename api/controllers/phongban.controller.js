const { Op } = require("sequelize");

const db = require('../models/database');

function themPhongBan(req, res){
    const phongBan = {
        tenPhongBan :  req.body.tenPhongBan,
        idDonVi : req.body.idDonVi
    };
    db.phongban.create(phongBan).then(data => {
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Them khong thanh cong"
        });
    });
}

function capNhatPhongBan(req, res) {
    const id = req.params.id;
    db.phongban.update(req.body,{
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
            message : err.message || "Khong The Cap Nhat"
        });
    });
}

function xuatPhongBanTheoDonVi(req, res){
    const idDonVi = req.params.idDonVi;
    db.phongban.findAll({
        where : {idDonVi : idDonVi}
    }).then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Khong the xuat tat ca"
        });
    });
}

module.exports = {themPhongBan,capNhatPhongBan,xuatPhongBanTheoDonVi};
