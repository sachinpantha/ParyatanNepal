import mongoose from "mongoose";
const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
})
const guideSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
    , name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    fees: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        required: true,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    reviews: [reviewSchema],

},
    {
        timestamps: true
    })
const Product = mongoose.model('Product', guideSchema)
export default Product;