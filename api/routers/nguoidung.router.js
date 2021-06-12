const express = require('express');
const router = express.Router();
const NguoiDung = require('../controllers/nguoidung.controller');

router.post('/themNguoiDung',NguoiDung.themNguoiDung);
router.put('/capNhatNguoiDung/:id',NguoiDung.capNhatNguoiDung);
router.get('/timNguoiDungTheoID/:id',NguoiDung.timNguoiDungTheoID);
router.get('/timNguoiDungTheoPhongBan/:idPhongBan',NguoiDung.timNguoiDungTheoPhongBan);
router.get('/xuatTatCaNguoiDung',NguoiDung.xuatTatCaNguoiDung);
router.get('/timNguoiDungTheoIDTaiKhoan/:idTaiKhoan',NguoiDung.timNguoiDungTheoIDTaiKhoan);

module.exports = router;