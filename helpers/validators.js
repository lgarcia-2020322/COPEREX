import { body } from "express-validator" //Capturar todo el body de la solicitud
import { validateErrors } from "./validate.error.js"
import { existUsername, existEmail } from "./db.validators.js"


export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
    body('phone', 'Phone cannot be empty or is not a valid phone')
        .notEmpty()
        .isMobilePhone(),
    validateErrors
]

export const loginValidator = [
    body('userLoggin', 'Username or email cannot be empty')
        .notEmpty()
        .toLowerCase(),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
        validateErrors
]

export const updateUserValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('email', 'Must be a valid email')
        .isEmail(),

        validateErrors
];

export const categoryValidator = [
    body('name', 'Category name cannot be empty')
        .notEmpty(),

    body('description', 'Description cannot be empty')
        .optional(),
    validateErrors
]

export const companyValidator = [
    body('name', 'Company name cannot be empty')
        .notEmpty(),

    body('impactLevel', 'Impact level cannot be empty')
        .notEmpty(),

    body('yearsOfExperience', 'Years of experience must be a positive number')
        .isInt({ min: 0 }),

    body('category', 'Category ID must be a valid Mongo ID')
        .isMongoId(),

    validateErrors
]