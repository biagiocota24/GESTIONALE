export const ADD_RESERVATION = "ADD_RESERVATION";

export const addReservation = (reservation) => ({
  type: ADD_RESERVATION,
  payload: reservation,
});
