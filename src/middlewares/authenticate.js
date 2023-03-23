const jwt = require('jsonwebtoken')
const {User} = require('../models')
const createError = require('../utils/create-error')

module.exports = async (req,res,next) => {
    try{
        const {authorization} = req.headers
        if(!authorization||!authorization.startsWith('Bearer')){
            createError('you are not authorized',401)
        }
        // console.log(authorization)
        const token = authorization.split(' ')[1]
        const payload = jwt.verify(token,process.env.JWT_SECRET_KEY)
        const user = await User.findOne({
            where:{id:payload.id},
            attributes:{
                exclude:['password']
            }
        })
        if(!user){
            createError('You are unauthorized',401)
        }
        req.user = user
        next()
    }catch(err){
        next(err)
    }
}