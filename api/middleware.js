const userModel = require("./model");

 
function validateUserPayload(req,res,next){
    try {
        const {kullaniciadi, password}= req.body;
        if(!kullaniciadi || !password){
            res.status(400).json({message:"Eksik alan var"});
        }
        else{
            next();
        }
    } catch (error) {
        next(error);
    }
}

function validateUniqueUserName(req,res,next){
    try {
        const {kullaniciadi}= req.body;
        const allUsers = userModel.getAllUsers();
        let isExistUser = allUsers.filter(x=>x.kullaniciadi == kullaniciadi).length>0;
        if(isExistUser){
            res.status(400).json({message:"Böyle bir kullanıcı mevcut."});
        }else{
            next();
        }
    } catch (error) {
        next(error);
    }
}

function validateLogin(req,res,next){
    try {
        let user = {kullaniciadi:req.body.kullaniciadi,password:req.body.password};
        let existUser = userModel.checkLogin(user);
        if(!existUser){
            res.status(404).json({message:"Login parametreleri hatalı"})
        }else{
            req.findedUser = existUser;
            next();

        }
    } catch (error) {
        next(error);
    }
}


module.exports = {
    validateUniqueUserName,
    validateUserPayload,
    validateLogin
}