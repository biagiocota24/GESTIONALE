export const ADD_GUEST = "ADD_GUEST";

export const addGuest = (guest) => ({
  type: ADD_GUEST,
  payload: guest,
});
