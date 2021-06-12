const express = require('express');
const router = express.Router();
const DonVi = require('../controllers/donvi.controller');

router.post('/themDonVi',DonVi.themDonVi);
router.delete('/xoaDonVi/:id',DonVi.xoaDonVi);
router.get('/timDonViTheoID/:id',DonVi.timDonViTheoID);
router.get('/xuatTatCaDonVi',DonVi.xuatTatCaDonVi);

module.exports = router;