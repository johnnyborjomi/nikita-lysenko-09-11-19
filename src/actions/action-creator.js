import { ADD_TO_FAVORITES_LIST } from "./actions-names";
import { REMOVE_FROM_FAVORITES_LIST } from "./actions-names";

export const addToFavoritesList = newFavoritesList => ({
  type: ADD_TO_FAVORITES_LIST,
  payload: newFavoritesList
});

export const removeFromFavoritesList = newFavoritesList => ({
  type: REMOVE_FROM_FAVORITES_LIST,
  payload: newFavoritesList
});
