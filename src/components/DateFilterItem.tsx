import { memo, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Typography } from "@mui/material";
import { Action } from "../reducer/filterOptions";
import { DateBox } from "./MuiCustoms";

// Types
interface Props {
    dispatch: (value: Action) => void,
    direction: string
}

const DateFilterItem:React.FC<Props> = ({dispatch, direction}) => {
    const [value, setValue] = useState()

    return ( <DateBox>
        <Typography>{direction}:</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            onChange={(newValue: any) => {
              setValue(newValue);
              dispatch({
                type: `date_${direction}`,
                payload: newValue,
              });
            }}
          />
        </LocalizationProvider>
      </DateBox> );
}
 
export default memo(DateFilterItem);