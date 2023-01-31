import { Router } from 'express';
import { verifyReferralCode } from '../controllers/utils.controller.js';


const router = Router();

router.post('/verifyReferralCode', verifyReferralCode);     // Chequea el codigo de referido.


export default router;
