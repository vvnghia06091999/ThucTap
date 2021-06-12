const express = require('express');
const router = express.Router();
const LoaiVanBan = require('../controllers/loaivanban.controller');

router.post('/themLoaiVanBan',LoaiVanBan.themLoaiVanBan);
router.get('/xuatTatCaLoaiVanBan',LoaiVanBan.xuatTatCaLoaiVanBan);


module.exports = router;