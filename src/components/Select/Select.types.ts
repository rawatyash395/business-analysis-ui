import { SelectProps } from "@mui/material";

export type SelectType = SelectProps & {
    options: Array<OptionType>
}

type OptionType = {
    label: string
    value: string
}