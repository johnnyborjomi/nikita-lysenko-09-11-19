import {CHANGE_FAVORITES_LIST} from "../actions/actions-names";

const initalState = {
  favoritesList: []
};

export const favoritesList = (state = initalState, action) => {
  switch (action.type) {
    case CHANGE_FAVORITES_LIST:
      return { ...state, favoritesList: state.favoritesList.concat(action.payload)};
    default:
      return state;
  }
};
