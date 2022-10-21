//This will act as orderModel.js
import mongoose from "mongoose";
const connectSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    connectItems: [{
        name: { type: String, required: true },
        image: { type: String, required: true },
        fees: { type: Number, required: true },
    }],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isConnected: {
        type: Boolean,
        required: true,
        default: false
    },
    connectedAt: {
        type: Date
    },
},
    {
        timestamps: true
    })
const Connection = mongoose.model('Connection', connectSchema)
export default Connection;