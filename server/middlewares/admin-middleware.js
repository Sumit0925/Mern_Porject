
const adminMiddlware = async (req, res, next) => {
    try {
        console.log(req.user);
        const adminRole = req.user.isAdmin;
        if (!adminRole) {
            return res.status(403).json({ message: "Acess denied. User is not Admin." })
        }
        //* If user is an admin, proceed to the next Middleware
        next();
    } catch (error) {
        
        next(error)
    }
}

module.exports = adminMiddlware;