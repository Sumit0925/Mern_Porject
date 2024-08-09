const Contact = require("../models/contact-model");


const contactForm = async (req, res) => {
    try {
        const response = req.body;
        await Contact.create(response);
        res.status(200).json({ msg: "Message sent Successfully" });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ msg: 'Internal Server Error' });
    }
}

module.exports = contactForm;