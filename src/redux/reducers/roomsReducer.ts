


const initialState = {
  rooms: JSON.parse(localStorage.getItem("rooms") || "[]"),
};

const roomsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default roomsReducer;
