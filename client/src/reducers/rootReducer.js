import { combineReducers } from "redux";
import questionsReducer from "./questionsReducer";
import answersReducer from "./answersReducers";
import categoriesReducer from "./categoriesReducer";

const rootReducer = combineReducers({
  questionsReducer,
  answersReducer,
  categoriesReducer
});

export default rootReducer;
