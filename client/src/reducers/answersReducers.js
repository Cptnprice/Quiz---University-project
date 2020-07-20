import { SET_ANSWER } from "../actions/ActionsType";

const initialState = {
  answers: []
};

const answersReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ANSWER:
      let answers = [...state.answers];
      let index = answers.findIndex(x => x.question === payload.question._id);
      if (index !== -1) {
        answers[index] = payload;
      } else {
        answers.push(payload);
      }
      return { answers };
    default:
      return state;
  }
};

export default answersReducer;
