const uuid = require("uuid");

function createId(){
    return uuid.v1();
}

function initalUsers(){
    return [
        {id:createId(),kullaniciadi:"admin",password:"root"}
    ]
}


let allUsers = initalUsers();

function getAllUsers(){
    return allUsers;
}
function getById(id){
    let user = null;
    
    for (let i = 0; i < allUsers.length; i++) {
        const element = allUsers[i];
        if(element.id == id){
            user = element;
            break;
        }
    }
    return user;
}

function insert(user){
    user.id = createId();
    allUsers.push(user);
    return user;
}

function checkLogin(user){
    let isFinded = null;
    //let isFinded = allUsers.filter(x=>x.kullaniciadi == user.kullaniciadi && x.password == user.password).length>0
    for (let i = 0; i < allUsers.length; i++) {
        const item = allUsers[i];
        if(user.kullaniciadi == item.kullaniciadi && user.password && item.password){
            isFinded = item;
            break;
        }
    }
    return isFinded;
}


module.exports = {
    getAllUsers,
    getById,
    insert,
    checkLogin
}