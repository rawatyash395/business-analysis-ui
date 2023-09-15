import { UserType } from "../pages/login/Login.types"

import { emailPattern } from "./regex"

/**
 *
 */
export const validateUserLogin = (user: UserType): UserType => {
    const error = {
        email: '',
        password: ''
    }
    if (!user.email) {
        error.email = 'Email is required'
    }
    if (!user.password) {
        error.password = 'Password is required'
    }
    if(user.email.length > 0 && !validateEmail(user.email)) {
        error.email = 'Invalid Email'
    }
    return error
}

/**
 * Function to test an email address against the pattern
 * @param {string} email
 */
export const validateEmail = (email: string) => {
    return emailPattern.test(email);
}