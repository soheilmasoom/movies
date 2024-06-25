import { useState } from "react";
import { Action, State } from "../reducer/filterOptions";
import { MuiSlider } from "./MuiCustoms";

// Types
interface Props {
  dispatch: (value: Action) => void;
  reducerState: State;
}

const RateFilterItem: React.FC<Props> = ({ dispatch, reducerState }) => {
  const [vote, setVote] = useState([
    reducerState["vote_average.gte"]
      ? Number(reducerState["vote_average.gte"])
      : 0,
    reducerState["vote_average.lte"]
      ? Number(reducerState["vote_average.lte"])
      : 100,
  ]);

  return (
    <MuiSlider
      valueLabelDisplay="auto"
      aria-label="rate slider"
      value={vote}
      onChange={(event) => {
        setVote(event.target?.value);
      }}
      onMouseUp={() => {
        dispatch({
          type: "vote",
          payload: vote
        });
      }}
    ></MuiSlider>
  );
};

export default RateFilterItem;
