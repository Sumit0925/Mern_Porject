const { z } = require("zod");

//* creating a object Schema
const signupSchema = z.object({
    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be atleast of 3 characters" })
        .max(255, { message: "Name must not be more than 255 characters" }),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Name must be atleast of 3 characters" })
        .max(255, { message: "Name must not be more than 255 characters" }),

    phone: z
        .string({ required_error: "Phone is reqired" })
        .trim()
        .min(10, { message: "Phone must atleast be of 10 characters" })
        .max(20, { message: "Phone must not be more than 20 characters" }),

    password: z
        .string({ required_error: "Password is required" })
        .min(6, { message: "Password must atleast be of 6 characters" })
        .max(1024, { message: "Password can't be greater than 1024 characters" }),

});

const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Name must be atleast of 3 characters" })
        .max(255, { message: "Name must not be more than 255 characters" }),

    password: z
        .string({ required_error: "Password is required" })
        .min(6, { message: "Password must atleast be of 6 characters" })
        .max(1024, { message: "Password can't be greater than 1024 characters" }),
})

const contactSchema = z.object({
    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be atleast of 3 characters" })
        .max(255, { message: "Name must not be more than 255 characters" }),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Name must be atleast of 3 characters" })
        .max(255, { message: "Name must not be more than 255 characters" }),

    message: z
        .string({ required_error: "Message is Required" })
        .trim()
        .min(3, { message: "Message must be atleast of 3 characters" })


})

const AdminUserSchema = z.object({
    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be atleast of 3 characters" })
        .max(255, { message: "Name must not be more than 255 characters" }),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Name must be atleast of 3 characters" })
        .max(255, { message: "Name must not be more than 255 characters" }),

    phone: z
        .string({ required_error: "Phone is reqired" })
        .trim()
        .min(10, { message: "Phone must atleast be of 10 characters" })
        .max(20, { message: "Phone must not be more than 20 characters" }),
})

module.exports = { signupSchema, loginSchema, contactSchema, AdminUserSchema };