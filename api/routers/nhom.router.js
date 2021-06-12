const express = require('express');
const router = express.Router();
const Nhom = require('../controllers/nhom.controller');

router.post('/themNhom',Nhom.themNhom);
router.put('/capNhatNhom/:id',Nhom.capNhatNhom);
router.get('/timNhomTheoIDNguoiTao/:idNguoiTao',Nhom.timNhomTheoIDNguoiTao);
router.delete('/xoaNhom/:id',Nhom.xoaNhom);

module.exports = router;