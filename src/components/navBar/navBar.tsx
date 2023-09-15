import { FC } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { BasicSelect } from '../Select/Select';

/**
 * Components - NavBar
 */
export const NavBar: FC = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '15px' }}>
                    <Box sx={{ minWidth: '250px' }}>
                        <BasicSelect
                            label='Recruitment Type'
                            options={[]}

                        />
                    </Box>

                    <Typography variant="h6" component="div">
                        Hi John
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
