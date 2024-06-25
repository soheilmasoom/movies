// Types
type ActionType = Record<string, string>;
export interface State {
  with_genres: string;
  with_origin_country: string;
  sort_by: string;
  "primary_release_date.gte": string;
  "primary_release_date.lte": string;
  "vote_average.gte": string;
  "vote_average.lte": string;
}
export interface Action {
  type: string;
  payload: any;
}

// Action Types
const ACTION_TYPE: ActionType = {
  GENRE: "genre",
  COUNTRY: "country",
  SORT: "sort",
  DATE_FROM: "date_from",
  DATE_TO: "date_to",
  VOTE: "vote",
};

// Initial State
export const filterOptions: State = {
  with_genres: "",
  with_origin_country: "",
  sort_by: "",
  "primary_release_date.gte": "",
  "primary_release_date.lte": "",
  "vote_average.gte": "",
  "vote_average.lte": "",
};

// Reducer Function
export const filterOptionsReducer = (state: State, action: Action): State => {
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

    case ACTION_TYPE.SORT:
      localStorage.setItem(
        "filterOptions",
        JSON.stringify({ ...filters, sort_by: action.payload })
      );
      return { ...filters, sort_by: action.payload };

    case ACTION_TYPE.DATE_FROM:
      return { ...filters, "primary_release_date.gte": action.payload };

    case ACTION_TYPE.DATE_TO:
      return { ...filters, "primary_release_date.lte": action.payload };

      case ACTION_TYPE.VOTE:
        return {
          ...filters,
          "vote_average.gte": action.payload[0],
          "vote_average.lte": action.payload[1],
        }

    default:
      return { ...state };
  }
};
