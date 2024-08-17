const Service = require("../models/service-model");

//^---------------------
//^ SERVICE LOGIC
//^-------------------

const services = async (req, res) => {
  try {
    const serviceData = await Service.find({});

    if (!serviceData) {
      res.status(404).json({ msg: "No Service Found" });
    }

    return res.status(200).json({ msg: "Service Found", serviceData });
  } catch (error) {
    console.log(`Service Error, ${error} `)
    res.status(500).json({msg:"error getting service data"});
  }
};

module.exports = services;
