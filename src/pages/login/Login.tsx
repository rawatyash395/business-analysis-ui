import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';

import { login } from '../../api/login.api';

import { validateUserLogin } from '../../utils/validation';

import { UserType } from './Login.types'
import './style.scss';
import { AxiosError } from 'axios';

const DefaultUser = {
    email: '',
    password: ''
}

/**
 * Pages - Login
 */
export const Login: FC = () => {
    const [user, setUser] = useState<UserType>(DefaultUser)
    const [error, setError] = useState<UserType>(DefaultUser)

    const navigate = useNavigate()


    // Mutations
    const mutation = useMutation({
        mutationFn: () => login(user),

        onSuccess: (res) => {
            const { email, token } = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('email', email)
            if (token) {
                navigate('/')
            }
        },
        onError: (err: AxiosError<string>) => {
            setError(prev => ({ ...prev, beError: err?.response?.data }))
        }
    })

    /**
     * It will manage the change handler for email and password field
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const key = event.target.name
        setUser(prev => ({ ...prev, [key]: event.target.value.trim() }))
    }

    /**
     * Add login api call for authorization
    */
    const handleLogin = () => {
        const errorObj = validateUserLogin(user)
        if (Object.values(errorObj).join('').length > 0) {
            return setError(prev => ({ ...prev, ...errorObj }))
        }
        setError(DefaultUser)
        mutation.mutate()
    }

    return (
        <>
            <div className='wrapper'>
                <h2>Business Analysis</h2>
                <div className='form-wrapper'>
                    <div className='form-group-wrapper'>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            type="email"
                            name="email"
                            required
                            value={user.email}
                            error={!!error.email}
                            onChange={handleChange}
                            helperText={error.email}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            variant="outlined"
                            type="password"
                            name="password"
                            required
                            value={user.password}
                            error={!!error.password}
                            onChange={handleChange}
                            helperText={error.password}
                        />
                        <Button
                            className='btn-login'
                            variant="outlined"
                            onClick={handleLogin}
                        >Login</Button>
                    </div>
                    <div className='right-side'>
                        <img src="" alt="" />
                    </div>
                </div>
                <div>
                    <h1 className='error-message'>{error?.beError}</h1>
                </div>
            </div>
        </>
    )
}

