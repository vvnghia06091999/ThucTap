const { Op } = require("sequelize");

const db = require('../models/database');

function themNguoiDung (req, res){
    const nguoiDung = {
        tenNguoiDung : req.body.tenNguoiDung,
        email : req.body.email,
        photo : req.body.photo,
        soDienThoai : req.body.soDienThoai,
        idTaiKhoan : req.body.idTaiKhoan,
        idChucVu : req.body.idChucVu,
        idPhongBan : req.body.idPhongBan
    };
    db.nguoidung.create(nguoiDung).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message : err.message || "Them khong thanh cong"
        });
    });
}

function capNhatNguoiDung(req, res){
    const id = req.params.id;
    db.nguoidung.update(req.body,{
        where : {id : id}
    }).then(num =>{
        if(num == 1){
            res.send({
                message : "Cap Nhat Thanh Cong"
            });
        }else{
            res.send({
                message : "Cap Nhat Khong Thanh Cong"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message : err.message || "Khong The Cap Nhat"
        });
    });
}

function timNguoiDungTheoID(req, res){
    const id = req.params.id;
    db.nguoidung.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message : err.message || "Khong Tim Thay"
        });
    });
}
function timNguoiDungTheoPhongBan(req, res){
    const idPhongBan = req.params.idPhongBan;
    db.nguoidung.findAll({
        where : {idPhongBan : idPhongBan}
    }).then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Khong Tim Thay"
        });
    });
}
function xuatTatCaNguoiDung(req,res) {
    db.nguoidung.findAll().then(data => {
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Khong Tim Thay"
        })
    });
}
function timNguoiDungTheoIDTaiKhoan(req, res){
    const idTaiKhoan = req.params.idTaiKhoan;
    db.nguoidung.findOne({
        where : {idTaiKhoan : idTaiKhoan}
    }).then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Khong Tim Thay"
        });
    });
}

module.exports = {themNguoiDung,capNhatNguoiDung,timNguoiDungTheoID,timNguoiDungTheoPhongBan,xuatTatCaNguoiDung,timNguoiDungTheoIDTaiKhoan};