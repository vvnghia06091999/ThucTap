const express = require('express');
const router = express.Router();
const ChiTietNhom = require('../controllers/chitietnhom.controller');

router.post('/themChiTietNhom',ChiTietNhom.themChiTietNhom);
router.get('/timChiTietNhomTheoIDNhom/:idNhom',ChiTietNhom.timChiTietNhomTheoIDNhom);
router.delete('/xoaChiTietNhom/:idNhom/:idNguoiDung',ChiTietNhom.xoaChiTietNhom);


module.exports = router;