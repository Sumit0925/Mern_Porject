const Contact = require("../models/contact-model");
const User = require("../models/user-model")

//^---------------------
//^  getting all USERS for Admin Page-LOGIC
//^-------------------

const getAllUsers = async (req,res) =>{
    try {
        const users = await User.find({},{password:0})
        if(!users || users.length === 0){
            return res.status(404).json({message : "No User Found!"})
        }
        console.log(users);
        return res.status(200).json(users);
    } catch (error) {
        next(error)
    }
}

//^---------------------
//^  getting all CONTACTS for Admin Page-LOGIC
//^-------------------

const getAllContacts = async (req,res) =>{
    try {
        const contacts = await Contact.find({});
        if(!contacts || contacts.length === 0){
            return res.status(404).json({message : "No User Found!"})
        }
        console.log(contacts);
        return res.status(200).json(contacts);
    } catch (error) {
        next(error)
    }
}

module.exports = {getAllUsers, getAllContacts};