const express = require('express');
const router = express.Router();
const LinhVucVanBans = require('../controllers/linhvucvanban.controller');

router.post('/themLinhVucVanBan',LinhVucVanBans.themLinhVucVanBan);
router.get('/xuatTatCaLinhVucVanBan',LinhVucVanBans.xuatTatCaLinhVucVanBan);

module.exports = router;