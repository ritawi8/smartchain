import express from 'express';
import { authMiddleware } from '../auth/auth-middleware.mjs';
import {
	addTransaction,
	listAllTransactions,
	mineTransactions,
} from '../controllers/transaction-controller.mjs';

const router = express.Router();

router.post('/transactions', authMiddleware, addTransaction);
router.get('/transactions', listAllTransactions);
router.route('/transactions/mine').get(mineTransactions);
// router.route('/info').get(getWalletInfo);

export default router;
