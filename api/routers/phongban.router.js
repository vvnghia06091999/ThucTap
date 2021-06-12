const express = require('express');
const router = express.Router();
const PhongBan = require('../controllers/phongban.controller');

router.post('/themPhongBan',PhongBan.themPhongBan);
router.put('/capNhatPhongBan/:id',PhongBan.capNhatPhongBan);
router.get('/xuatPhongBanTheoDonVi/:idDonVi',PhongBan.xuatPhongBanTheoDonVi);


module.exports = router;