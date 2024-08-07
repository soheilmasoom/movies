import React, { memo, useContext, useReducer } from "react";
import {
  Button,
  Divider,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { filterOptions, filterOptionsReducer } from "../reducer/filterOptions";
import { CheckParams, CheckParamsType } from "../context/CheckParams";
import { FilterData, FilterDataType } from "../context/MoviesData";
import { ListItem } from "../pages/Movies";

// Components
import FilterItem from "./FilterItem";
import DateFilterItem from "./DateFilterItem";
import RateFilterItem from "./RateFilterItem";
import { Accord, OptionsDivider, Sidebar } from "./MuiCustoms";
import { useNavigate } from "react-router-dom";

// Sort List
export const sortList: ListItem[] = [
  { id: "original_title.asc", name: "Title Ascending" },
  { id: "original_title.desc", name: "Title Descending" },
  { id: "popularity.asc", name: "Popularity Ascending" },
  { id: "popularity.desc", name: "Popularity Descending" },
  { id: "primary_release_date.asc", name: "Release Ascending" },
  { id: "primary_release_date.desc", name: "Release Descending" },
  { id: "average_vote.asc", name: "Vote Rate Ascending" },
  { id: "average_vote.desc", name: "Vote Rate Descending" },
];

// Types
interface AsideProps {
  closeMenu?: () => void
}

const Aside: React.FC<AsideProps> = ({closeMenu}) => {
  const params = useContext<CheckParamsType>(CheckParams);
  const [reducerState, dispatch] = useReducer(
    filterOptionsReducer,
    filterOptions
  );
  const filterData = useContext<FilterDataType>(FilterData)
  const navigate = useNavigate()
  

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
          handleChange={(e) => {
            handleChange(e)
            closeMenu && closeMenu()
            navigate("/movies")
          }}
          filterOptionsList={sortList}
        />
      </FormControl>

      {/* Genre */}
      <FormControl fullWidth>
        <FilterItem
          name="genre"
          handleChange={(e) => {
            handleChange(e)
            closeMenu && closeMenu()
            navigate("/movies")
          }}
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
            closeMenu && closeMenu()
            navigate("/movies")
          }}
        >
          Filter
        </Button>
      </Accord>
      
    </Sidebar>
  );
};

export default memo(Aside);
