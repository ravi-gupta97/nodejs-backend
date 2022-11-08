const User = require("../model/User");

const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        return next(err);
    }
    if (!users) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(200).json({ users });

};

const addUser = async (req, res, next) => {
    const { name, age, mobile, address } = req.body;
    if (!name || !age || !mobile || !address || mobile.length!=10) {
        return res.status(422).json({ message: "Invalid Data Entry" });
    }
    let existingUser = await User.findOne({mobile});
    if(existingUser){
        return res.status(400).json({message:"User already exist"});
    }
    let user;
    try {
        user = new User({ name, age, mobile, address });
        user =await user.save();

    } catch (err) {
        return next(err);
    }
    if(!user){
        return res.status(500).json({message:"Internal Server Error"});
    }
    return res.status(200).json({user});
};

const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, age, mobile, address} = req.body;
    if (!name || !age || !mobile || !address || mobile.length!=10 ) {
        return res.status(422).json({ message: "Invalid Data Entry" });
    }
    let user;
    try{
        user = await User.findByIdAndUpdate(id,{name,age, mobile, address});

    }catch(err){
        return next(err) ;
    }
    if(!user){
        return res.status(500).json({message:"unable to update"});
    }
    return res.status(200).json({message: "updated sccsfully"});
};
const deleteUser = async (req, res, next ) => {
    const id = req.params.id;
    let user;
    try{
        user = await User.findByIdAndRemove(id);

    }catch(err){
        return next(err);
    }
    if(!user){
        return res.status(500).json({message:"unable to delete"});
    }
    return res.status(200).json({messge:"deleted sccssfully"});    

};
const getUserById = async(req,res,next)=>{
    const id =req.params.id ;
    let user;
    try{
user = await User.findById(id);
    }catch(err){
        return next(err);
    }
    if(!user){
        return res.status(500).json({message:"Internal server error"});
    }
    return res.status(200).json({user});
};

exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUserById = getUserById;