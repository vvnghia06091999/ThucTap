const express = require('express');
const router = express.Router();
const ChiTietVanBanGuiNhan = require('../controllers/chitietvanbanguinhan.controller');

router.post('/themChiTietVanBanGuiNhan',ChiTietVanBanGuiNhan.themChiTietVanBanGuiNhan);
router.put('/capNhatChiTietVanBanGuiNhan/:idVanBanGuiNhan/:idNguoiNhan',ChiTietVanBanGuiNhan.capNhatChiTietVanBanGuiNhan);
router.get('/timVanBanGuiNhanTheoIDVanBanGuiNhan/:idVanBanGuiNhan',ChiTietVanBanGuiNhan.timVanBanGuiNhanTheoIDVanBanGuiNhan);
router.get('/timVanBanGuiNhanTheoNguoiNhan/:idNguoiNhan',ChiTietVanBanGuiNhan.timVanBanGuiNhanTheoNguoiNhan);

module.exports = router;