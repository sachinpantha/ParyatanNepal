import express from 'express'
import { addOrderItems, getOrderByID, updateOrderToPaid, getMyOrders } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()
router.route('/').post(protect, addOrderItems)
router.route('/myconnections').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderByID)
router.route('/:id/pay').put(protect, updateOrderToPaid)
export default router