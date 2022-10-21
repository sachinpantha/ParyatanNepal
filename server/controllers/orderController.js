import asyncHandler from 'express-async-handler'
import Connection from '../models/connectModel.js'
//@desc Create new order
//@routes GET /api/orders
//@access Private
const addOrderItems = asyncHandler(async (req, res) => {
    const { connectItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, totalPrice } = req.body
    if (connectItems && connectItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    }
    else {
        const order = new Connection({
            connectItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

//@desc Get order by ID
//@routes GET /api/orders:id
//@access Private
const getOrderByID = asyncHandler(async (req, res) => {
    const order = await Connection.findById(req.params.id).populate('user', 'name email')
    if (order) {
        res.json(order)
    }
    else {
        res.status(404)
        throw new Error('Order not found')
    }
})

//@desc Update order to paid
//@routes GET /api/orders/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Connection.findById(req.params.id)
    if (order) {
        order.isPaid = true,
            order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }
    else {
        res.status(404)
        throw new Error('Order not found')
    }
})
export {
    addOrderItems,
    getOrderByID,
    updateOrderToPaid
}