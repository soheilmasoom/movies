// Types
type ActionType = Record<string, string>;
export interface State {
  with_genres: string;
  with_origin_country: string;
}
export interface Action {
  type: string;
  payload: string;
}

// Action Types
const ACTION_TYPE: ActionType = {
  GENRE: "genre",
  COUNTRY: "country",
};

// Initial State
export const searchParams: State = {
  with_genres: "",
  with_origin_country: "",
};

// Reducer Function
export const searchParamsReducer = (state: State, action: Action): State => {
  const filters = JSON.parse(localStorage.getItem("filterOptions") as string);

  switch (action.type) {
    case ACTION_TYPE.GENRE:
      localStorage.setItem(
        "filterOptions",
        JSON.stringify({ ...filters, with_genres: action.payload })
      );
      return { ...filters, with_genres: action.payload };

    case ACTION_TYPE.COUNTRY:
      localStorage.setItem(
        "filterOptions",
        JSON.stringify({ ...filters, with_origin_country: action.payload })
      );
      return { ...filters, with_origin_country: action.payload };

    default:
      return { ...state };
  }
};
