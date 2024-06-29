import { ReactNode, createContext, useMemo } from "react";
import { ListItem } from "../components/Movies";
import { useQuery } from "react-query";
import { moviesAPI } from "../App";

// Types
interface FilterDataProviderProps {
  children: ReactNode;
}

export const FilterData = createContext({
  genreList: [],
  countriesList: [],
});

export const FilterDataProvider: React.FC<FilterDataProviderProps> = ({children}) => {
  // GenreListAPI Req
  const { data: genreList } = useQuery({
    queryKey: ["genresAPI"],
    queryFn: async () => {
      const res = await moviesAPI.get("/3/genre/movie/list");
      return res?.data.genres;
    },
  });

  // CountriesListAPI Req
  const { data: countries } = useQuery({
    queryKey: ["countriesAPI"],
    queryFn: async () => {
      const res = await moviesAPI.get("/3/configuration/countries");
      return res?.data;
    },
  });

  // Countries Table
  let countriesList: ListItem[] = [];
  useMemo(() => {
    countries !== undefined &&
      countries.map((country: any) => {
        const temp = { id: country.english_name, name: country.english_name };
        countriesList.push(temp);
      });
    // setCountriesList(countryTemp);
  }, [countries]);

  const initial = {
    genreList,
    countriesList,
  }

  return <FilterData.Provider value={initial}>{children}</FilterData.Provider>;
};
