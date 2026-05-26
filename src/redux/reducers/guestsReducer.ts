import { ADD_GUEST } from "../actions/guestAction";

const initialState = {
  guests: JSON.parse(localStorage.getItem("guests")),
};

const guestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GUEST:
      return {
        ...state,
        guests: [...state.guests, action.payload],
      };
    default:
      return state;
  }
};

export default guestsReducer;
