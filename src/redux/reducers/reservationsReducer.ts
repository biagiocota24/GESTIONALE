import { ADD_RESERVATION } from "../actions/reservationAction";


const initialState = {
  reservations: JSON.parse(localStorage.getItem("reservations")),
};

const reservationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RESERVATION:
      return {
        ...state,
        reservations: [...state.reservations, action.payload],
      };
    default:
      return state;
  }
};

export default reservationsReducer;
