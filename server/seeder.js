//THIS SCRIPT WILL RUN INDEPENDENTLY AND HELP TO LOAD SAMPLE DATA INTO DATABASE
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/guides.js'
import User from './models/userModel.js'
import Product from './models/guideModel.js'
import Connection from './models/connectModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Connection.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id
        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }
        })
        await Product.insertMany(sampleProducts)
        console.log('Data Imported')
        process.exit()
    }
    catch (err) {
        console.log(err)
        process.exit(1)
    }
}
const destroyData = async () => {
    try {
        await Connection.deleteMany()
        // await Product.deleteMany()
        await User.deleteMany()
        console.log('Data Destroyed')
        process.exit()
    }
    catch (err) {
        console.log(err)
        process.exit(1)
    }
}

//TO ACCESS THE FLAG OF COMMAND IN TERMINAL
if (process.argv[2] === '-d') {
    destroyData()
}
else {
    importData();
}