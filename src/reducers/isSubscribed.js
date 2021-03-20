const isSubscribedReducer = (state = false, action) => {
  switch (action.type) {
    case "isSubscribed":
      return "true";
    case "isNotSubscribed":
      return "false";
    default:
      return state;
  }
};

export default isSubscribedReducer;
