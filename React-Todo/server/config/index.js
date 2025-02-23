require('dotenv').config()
module.exports ={
    PORT : process.env.PORT,
    MONGODB_URL : process.env.MONGODB_URL,
    AUTH: process.env.JWT_SECRET,
}