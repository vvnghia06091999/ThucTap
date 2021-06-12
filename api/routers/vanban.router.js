const express = require('express');
const router = express.Router();
const VanBan = require('../controllers/vanban.controller');

router.post('/themVanBan',VanBan.themVanBan);
router.get('/timVanBanTheoID/:id',VanBan.timVanBanTheoID);
router.put('/capNhatVanBan/:id',VanBan.capNhatVanBan);
router.delete('/xoaVanBan/:id',VanBan.xoaVanBan);

module.exports = router;