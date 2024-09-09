import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
//@desc Auth user & get token
//@routes POST/api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    console.log(user)
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
})

//@desc Register a new user
//@routes POST/api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already Exists')
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})
//@desc get user profile
//@routes GET/api/users/profile
//@access Public
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    }
    else {
        res.status(404)
        throw new Error('Invalid Email or Password')
    }
})



// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            token: generateToken(updatedUser._id),
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc get all users
//@routes GET/api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const user = await User.find({})
    res.json(user)

})

//@desc Delte  user
//@routes DELETE/api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {

        await user.remove()
        res.json({ message: 'User removed' })

    }
    else {
        res.status(404)
        throw new Error('User not found')
    }

})

//@desc get user by ID
//@routes GET/api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.json(user)
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }

})

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        // Ensure isAdmin is explicitly set or default to current value
        if (req.body.isAdmin !== undefined) {
            user.isAdmin = req.body.isAdmin;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});



export {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}