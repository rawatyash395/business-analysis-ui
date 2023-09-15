import { SelectProps } from "@mui/material";

export type SelectType = SelectProps & {
    options: Array<OptionType>
}

export type OptionType = {
    label: string
    value: string
}