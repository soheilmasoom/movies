import { FormControl, SelectChangeEvent } from "@mui/material";
import { Sidebar } from "./MuiCustoms";
import { useReducer } from "react";
import { searchParams, searchParamsReducer } from "../reducer/filterOptions";
import {
  InfiniteData,
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { ListItem } from "./Movies";
import FilterItem from "./FilterItem";

interface Props {
  getFilterOptions: (state: {}) => void;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<InfiniteData<any>, unknown>>;
  genreList: ListItem[];
  countriesList: ListItem[];
}

const Aside: React.FC<Props> = ({
  refetch,
  getFilterOptions,
  genreList,
  countriesList,
}) => {
  const [filterOptions, dispatch] = useReducer(
    searchParamsReducer,
    searchParams
  );
  getFilterOptions(filterOptions);

  // Filter Method
  const handleChange = (event: SelectChangeEvent) => {
    dispatch({
      type: event.target.name,
      payload: event.target.value ? event.target.value.toString() : "",
    });
    
    setTimeout(() => {
      refetch();
    }, 500);
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
      <FormControl fullWidth>
        <FilterItem
          name="country"
          handleChange={handleChange}
          filterOptionsList={countriesList}
        />
      </FormControl>
    </Sidebar>
  );
};

export default Aside;
