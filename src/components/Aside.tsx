import { FormControl, SelectChangeEvent } from "@mui/material";
import { Sidebar } from "./MuiCustoms";
import { memo, useContext, useReducer } from "react";
import { searchParams, searchParamsReducer } from "../reducer/filterOptions";
import { ListItem } from "./Movies";
import FilterItem from "./FilterItem";
import { CheckParams } from "../context/CheckParams";

interface Props {
  genreList: ListItem[];
  countriesList: ListItem[];
}

const Aside: React.FC<Props> = ({
  genreList,
}) => {
  const params = useContext(CheckParams)

  const [none, dispatch] = useReducer(
    searchParamsReducer,
    searchParams
  );

  // Filter Method
  const handleChange = (event: SelectChangeEvent) => {
    dispatch({
      type: event.target.name,
      payload: event.target.value ? event.target.value.toString() : "",
    });

    params?.changeCheckFilter()
  };

  return (
    <Sidebar sx={{ height: "90vh" }}>
      <FormControl fullWidth>
        <FilterItem
          name="genre"
          handleChange={handleChange}
          filterOptionsList={genreList}
        />
      </FormControl>
      {/* <FormControl fullWidth>
        <FilterItem
          name="country"
          handleChange={handleChange}
          filterOptionsList={countriesList}
        />
      </FormControl> */}
    </Sidebar>
  );
};

export default memo(Aside);
