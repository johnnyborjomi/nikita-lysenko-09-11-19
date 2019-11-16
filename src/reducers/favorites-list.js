import { ADD_TO_FAVORITES_LIST } from "../actions/actions-names";
import { REMOVE_FROM_FAVORITES_LIST } from "../actions/actions-names";

import { some, remove } from "lodash";

const initalState = {
  favoritesList: []
};

export const favoritesList = (state = initalState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES_LIST:
      console.log(
        state.favoritesList,
        action.payload,
        some(state.favoritesList, action.payload)
      );
      return some(state.favoritesList, action.payload)
        ? state
        : { ...state, favoritesList: [...state.favoritesList, action.payload] };

    case REMOVE_FROM_FAVORITES_LIST:
      remove(state.favoritesList, fav => fav.Key == action.payload.Key);
      return {
        ...state,
        favoritesList: [...state.favoritesList]
      };
    default:
      return state;
  }
};
