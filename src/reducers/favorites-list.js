import { ADD_TO_FAVORITES_LIST } from "../actions/actions-names";
import { REMOVE_FROM_FAVORITES_LIST } from "../actions/actions-names";

import cache from "../cache";

const initalState = {
  favoritesList: cache.get("favoritesList") || []
};

export const favoritesList = (state = initalState, action) => {
  console.log(action);

  let { favoritesList } = state;

  switch (action.type) {
    case ADD_TO_FAVORITES_LIST: {
      const foundIndex = favoritesList.findIndex(
        f => f.Key === action.payload.Key
      );

      if (foundIndex >= 0) break;

      favoritesList = [...state.favoritesList, action.payload];
      break;
    }
    case REMOVE_FROM_FAVORITES_LIST: {
      const foundIndex = favoritesList.findIndex(
        f => f.Key === action.payload.Key
      );

      if (foundIndex < 0) break;

      favoritesList = state.favoritesList.filter(
        f => f.Key !== action.payload.Key
      );
      break;
    }
  }

  cache.set("favoritesList", favoritesList);
  return {
    ...state,
    favoritesList
  };
};
