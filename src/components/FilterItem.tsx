import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { ListItem } from "./Movies";

// Types
interface Props {
  handleChange: (event: SelectChangeEvent) => void;
  // filterOptions: State,
  name: string;
  filterOptionsList: any;
}

const FilterItem: React.FC<Props> = ({
  name,
  filterOptionsList,
  handleChange,
}) => {
  const filters = JSON.parse(localStorage.getItem("filterOptions") as string);

  const filterReader = (filterName: string) => {
    switch (filterName) {
      case "genre":
        return filters?.with_genres;

      case "country":
        return filters?.with_origin_country;

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
        value={filters ? filterReader(name) : ""}
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

export default FilterItem;
