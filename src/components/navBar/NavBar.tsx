import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, SelectChangeEvent } from '@mui/material';

import { BasicSelect } from '../Select/Select';

import { getRevenueChartData } from '../../api/revenue.api';

import { NavBarType } from './NavBar.type';

import './navbar.scss';

/**
* Components - NavBar
*/
export const NavBar: FC<NavBarType> = ({ revenueTypes }) => {
    const navigate = useNavigate()
    const [revenueType, setRevenueType] = useState(revenueTypes?.[0]?.value || '')

    const { refetch } = useQuery({
        queryKey: ['revenueChartsQuery'],
        queryFn: () => getRevenueChartData({ revenueType }),
    })

    const user = localStorage.getItem('email')?.split('@')[0] || ''

    useEffect(() => {
        refetch()
    }, [revenueType, refetch])


    /**
    * Logged out user and clear the token
    */
    const handleLogOut = () => {
        localStorage.removeItem('email')
        localStorage.removeItem('token')
        navigate('/login')
    }

    const handleSelectTypeChange = (event: SelectChangeEvent<unknown>): void => {
        setRevenueType(event.target.value as string)
    }

    return (
        <Box className="navbarWrapper" >
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '15px' }}>
                    <Box sx={{ minWidth: '250px' }}>
                        <BasicSelect
                            label='Revenue Type'
                            value={revenueType}
                            options={revenueTypes}
                            onChange={handleSelectTypeChange}
                        />
                    </Box>

                    <Box className="content-btn">
                        <Typography variant="h6" component="div">
                            Hi {user}
                        </Typography>
                        <Button onClick={() => handleLogOut()}>
                            Log Out
                        </Button>
                    </Box>

                </Toolbar>
            </AppBar>
        </Box>
    );
}