const express = require('express');
const router = express.Router();
const ChucVu = require('../controllers/chucvu.controller');

router.post('/themChucVu',ChucVu.themChucVu);
router.get('/xuatTatCaChucVu',ChucVu.xuatTatCaChucVu);
router.get('/timChucVuTheoTen/:tenChucVu',ChucVu.timChucVuTheoTen);
router.put('/capNhatChucVu/:id',ChucVu.capNhatChucVu);

module.exports = router;