
const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "BACKEND ERROR";
    const extraDetails = err.extraDetails || "Error from Backend";

    return res.status(status).json({message,extraDetails});
}

/* 
*   first you have to write 
^   app.use(errorMiddleware)
*   in "server.js" to make use of this middleware
!   Now to use this middleware for getting errors you have to write
~   next(error) where error = {status,message,extraDetails}
!   instead of your "res.status(500).json({msg:error})"

*/

module.exports = errorMiddleware;