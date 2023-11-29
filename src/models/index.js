import moogoose from 'mongoose'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
try {
    moogoose.connect(`${process.env.dbUrl}/${process.env.dbName}`)
    console.log("moogoose connected successfully")
} catch (error) {
    console.log(error)
}

export default mongoose