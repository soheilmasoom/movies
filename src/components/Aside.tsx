import { memo, useContext, useReducer } from "react";
import {
  Button,
  Divider,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { filterOptions, filterOptionsReducer } from "../reducer/filterOptions";
import { CheckParams, CheckParamsType } from "../context/CheckParams";
import { FilterData, FilterDataType } from "../context/MoviesData";
import { ListItem } from "./Movies";

// Components
import FilterItem from "./FilterItem";
import DateFilterItem from "./DateFilterItem";
import RateFilterItem from "./RateFilterItem";
import { Accord, OptionsDivider, Sidebar } from "./MuiCustoms";

// Sort List
const sortList: ListItem[] = [
  { id: "original_title.asc", name: "Titles Ascending" },
  { id: "original_title.desc", name: "Titles Descending" },
  { id: "popularity.asc", name: "Popularity Ascending" },
  { id: "popularity.desc", name: "Popularity Descending" },
  { id: "primary_release_date.asc", name: "Release Ascending" },
  { id: "primary_release_date.desc", name: "Release Descending" },
  { id: "average_vote.asc", name: "Vote Rate Ascending" },
  { id: "average_vote.desc", name: "Vote Rate Descending" },
];

const Aside = () => {
  const params = useContext<CheckParamsType>(CheckParams);
  const [reducerState, dispatch] = useReducer(
    filterOptionsReducer,
    filterOptions
  );
  const filterData = useContext<FilterDataType>(FilterData)
  

  // Filter Method
  const handleChange = (event: SelectChangeEvent) => {
    dispatch({
      type: event.target.name,
      payload: event.target.value ? event.target.value.toString() : "",
    });
    params?.changeCheckFilter();
  };

  return (
    <Sidebar
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Divider textAlign="left" sx={{ fontSize: "1.5rem" }}>
        Filter Movies
      </Divider>

      {/* Sort */}
      <FormControl fullWidth>
        <FilterItem
          name="sort"
          handleChange={handleChange}
          filterOptionsList={sortList}
        />
      </FormControl>

      {/* Genre */}
      <FormControl fullWidth>
        <FilterItem
          name="genre"
          handleChange={handleChange}
          filterOptionsList={filterData.genreList}
        />
      </FormControl>

      {/* Other Options */}
      <Accord title="Other Options">

        <OptionsDivider>Country</OptionsDivider>
        <FormControl fullWidth size="small">
          <FilterItem
            name="country"
            handleChange={handleChange}
            filterOptionsList={filterData.countriesList}
          />
        </FormControl>

        <OptionsDivider>Release Date</OptionsDivider>
        <DateFilterItem dispatch={dispatch} direction={"from"}></DateFilterItem>
        <DateFilterItem dispatch={dispatch} direction={"to"}></DateFilterItem>

        <OptionsDivider>Vote Range</OptionsDivider>
        <RateFilterItem
          dispatch={dispatch}
          reducerState={reducerState}
        ></RateFilterItem>

        <OptionsDivider />
        <Button
          variant="contained"
          onClick={() => {
            localStorage.setItem("filterOptions", JSON.stringify(reducerState));
            params?.changeCheckFilter();
          }}
        >
          Filter
        </Button>
      </Accord>
      
    </Sidebar>
  );
};

export default memo(Aside);
