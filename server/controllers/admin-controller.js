const Contact = require("../models/contact-model");
const User = require("../models/user-model")

//^---------------------
//^  getting all USERS for Admin Page-LOGIC
//^-------------------

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 })
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No User Found!" })
        }
        console.log(users);
        return res.status(200).json(users);
    } catch (error) {
        next(error)
    }
}

//^---------------------
//^  Getting user by Id - LOGIC
//^-------------------

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ _id: id }, { password: 0 });
        return res.status(200).json({ user });
    } catch (error) {
        next(error)
    }
}


//^---------------------
//^  Updating a user by Id - LOGIC
//^-------------------

const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUserData = req.body;
        const UpdatedUser = await User.updateOne({ _id: id }, { $set: updatedUserData })
        return res.status(200).json({ message: "User Updated Sucessfully!!", UpdatedData: UpdatedUser })
    } catch (error) {
        next(error) 
    }
}


//^---------------------
//^  Deleting user by Id - LOGIC
//^-------------------

const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id });
        return res.status(200).json({ message: "User Deleted Successfully!!" })
    } catch (error) {
        res.status(400).json({ message: "Error in Deleting User" });
    }
}

//^---------------------
//^  getting all CONTACTS for Admin Page-LOGIC
//^-------------------

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({});
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "No User Found!" })
        }
        console.log(contacts);
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
}

module.exports = { getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById };