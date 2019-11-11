import { CHANGE_FAVORITES_LIST } from "./actions-names";

export const changeFavoritesList = newFavoritesList => ({
  type: CHANGE_FAVORITES_LIST,
  payload: newFavoritesList
});
