import { FC } from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { SelectType } from './Select.types';

/**
 * Components - Select
 */
export const BasicSelect: FC<SelectType> = ({
    label,
    value,
    onChange,
    options,
    ...rest
}) => {

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                {...rest}
                value={value}
                onChange={onChange}
                variant='outlined'
            >
                {options.map(({ label, value }) => (
                    <MenuItem value={value} key={value}>{label}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}