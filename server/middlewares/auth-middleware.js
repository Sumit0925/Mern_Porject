const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {

  const token = req.header("Authorization");
  // return res.status(200).json({"token":token})

  if (!token) {
    //* If you attempt to use an expired token, you'll recieve a '401 Unauthorixed HTTP' response
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP,Token not provided" });
  }

  // console.log("token from auth middleware",token);

  //* Assuming tokem is in the format "Bearer <jwtToken>, Removing the Bearer prefix";
  const jwtToken = token.replace("Bearer", "").trim();

  // console.log("token from auth middleware", jwtToken);

  try {
    //! verifying the jwt Token
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    // console.log(isVerified);

    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    console.log("User Data", userData);

    req.token = jwtToken;
    req.user = userData;
    req.UserID = User._id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, Invalid Token" });
  }
};
module.exports = authMiddleware;
