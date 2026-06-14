import { Router } from 'express';
import { listOrders, getOrder, createOrder } from '../controllers/order.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', listOrders);
router.get('/:id', getOrder);
router.post('/', createOrder);

export default router;
