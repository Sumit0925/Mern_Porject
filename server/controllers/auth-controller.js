const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

//^---------------------
//^ HOME LOGIC
//^-------------------

const home = async (req, res) => {
    try {
        res
            .status(200)
            .send("Welcome to HomePage using Controllers");
    } catch (error) {
        res
            .status(404)
            .send({ msg: 'Page not Found' })
    }
}

//^---------------------
//^ REGISTER LOGIC
//^-------------------

const register = async (req, res) => {
    try {
        console.log(req.body);

        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });//* when key:value pair is same(i.e {email:email}) you can simply write this

        if (userExist) {

            return res.status(400).json({ message: 'user already exists' });
        }


        //^ hash the password
        //! you have to "hash the password" in "user-model.js" using "Schema i.e userSchema" using the "pre method" so that the code looks "neat and clean" but if you want you can do here also using the "code below"


        // const saltRound = await bcrypt.genSalt(10);
        // const hash_password = await bcrypt.hash(password, saltRound);
        // const createdUser = await User.create({ username, email, phone, password: hash_password });


        const userCreated = await User.create({
            username,
            email,
            phone,
            password,
        });
        res
            .status(201)
            .send({
                message: "Registration Successful",
                token: await userCreated.generateToken(),
                userId: userCreated._id.toString(),

            });



    } catch (error) {
        res
            .status(500)
            .send({ message: 'Internal Server Error' })
    }
}

//^---------------------
//^ LOGIN LOGIC
//^-------------------

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(401).send({ message: 'Invalid Credential' });
        }

        // const passwordValid = await bcrypt.compare(password, userExist.password); //* do this using "Instance Method"
        // if (passwordValid) {
        //     return res.status(200).send({
        //         msg: "Login Successful",
        //         token: await userExist.generateToken(),
        //         userID: userExist._id.toString(),
        //     })
        // }

        const user = await userExist.isPasswordCorrect(password); //* Using Instance Method
        if (user) {
            return res.status(200).send({
                message: "Login Successful",
                token: await userExist.generateToken(),
                userID: userExist._id.toString(),
            })
        } else {
            res.status(401).send({ message: 'Invalid email or password' });
        }

    } catch (error) {
        res
            .status(500)
            .send({ message: 'Invalid Credentials' })
    }

}

//^---------------------
//^ to send user data -USER LOGIC
//^-------------------

const user = async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ userData });
    } catch (error) {
        console.log(`error form the user route ${error}`);
    }
}

module.exports = { home, register, login, user };