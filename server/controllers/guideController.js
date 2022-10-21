import asyncHandler from 'express-async-handler'
import Product from '../models/guideModel.js'
//@desc Fetch all products
//@routes GET /api/products
//@access Public
const getGuides = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products)
})
//@desc Fetch single products
//@routes GET /api/products/:id
//@access Public
const getGuideByID = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    }
    else {
        res.status(404)
        throw new Error('Guide not found')
    }
})
export {
    getGuides,
    getGuideByID
}