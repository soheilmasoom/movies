import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { ListItem } from "./Movies";
import { memo } from "react";

// Types
interface Props {
  handleChange: (event: SelectChangeEvent) => void;
  name: string;
  filterOptionsList: any;
}

const FilterItem: React.FC<Props> = ({
  name,
  filterOptionsList,
  handleChange,
}) => {
  const searchParams = JSON.parse(localStorage.getItem("filterOptions") as string);

  const filterReader = (filterName: string) => {
    switch (filterName) {
      case "genre":
        return searchParams?.with_genres;

      case "country":
        return searchParams?.with_origin_country;

      default:
        return;
    }
  };

  return (
    <>
      <InputLabel id={`filter-label`}>
        {name[0].toUpperCase() + name.slice(1)}
      </InputLabel>
      <Select
        labelId="filter-label"
        id="filter-option"
        value={searchParams ? filterReader(name) : ""}
        label={name[0].toUpperCase() + name.slice(1)}
        name={name}
        onChange={handleChange}
      >
        <MenuItem value={undefined}>All Items</MenuItem>
        {filterOptionsList?.map((item: ListItem, idx: number) => {
          return (
            <MenuItem value={item.id} key={idx}>
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};

export default memo(FilterItem);
