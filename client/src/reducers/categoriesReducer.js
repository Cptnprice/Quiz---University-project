import { CATEGORIES_LOAD_SUCCESS } from "../actions/ActionsType";

const initialState = {
  categories: []
};

const categoriesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CATEGORIES_LOAD_SUCCESS:
      return {
        categories: payload
      };
    default:
      return state;
  }
};

export default categoriesReducer;
