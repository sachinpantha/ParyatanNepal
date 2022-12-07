import {
  IS_LANDING_FALSE,
  IS_LANDING_TRUE,
} from "../constants/toggleConstants";

export const toggleLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case IS_LANDING_TRUE:
      return action.payload;
    case IS_LANDING_FALSE:
      return action.payload;

    default:
      return state;
  }
};
