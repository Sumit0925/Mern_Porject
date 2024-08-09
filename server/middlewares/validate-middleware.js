//* await schema.parseAsync(req.body)
//^ is the line were we use the {zod} to validate the request body data(req.body) against the defined schema

const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();   

    } catch (err) {
        // console.log(err);
        const status = 400;
        const message = err.errors[0].message;

        // res.status(400).json({msg: message});
        const error = {
            status,
            message,
        };
        next(error);
    }
}

module.exports = validate;