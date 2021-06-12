const express = require('express');
const router = express.Router();
const VanBanLuu = require('../controllers/vanbanluu.controller');

router.post('/themVanBanLuu',VanBanLuu.themVanBanLuu);
router.get('/timVanBanLuuTheoNguoiDung/:idNguoiDung',VanBanLuu.timVanBanLuuTheoNguoiDung);
router.delete('/xoaVanBanLuu/:id',VanBanLuu.xoaVanBanLuu);

module.exports = router;