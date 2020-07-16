import { getQuestions, getQuestionsByCategory, getAnswer, getCategories } from "../api/api";
import {
  QUESTION_LOAD_SUCCESS,
  QUESTION_LOAD_BY_CATEGORY_SUCCESS,
  CATEGORIES_LOAD_SUCCESS,
  SET_ANSWER,
} from "./ActionsType";

export const loadQuestions = () => async dispatch => {
  try {
    const questions = await getQuestions();
    dispatch({
      type: QUESTION_LOAD_SUCCESS,
      payload: questions
    });
  } catch (err) {
    console.log(err);
  }
};

export const loadQuestionsByCategory = (id) => async dispatch => {
  try {
    const questions = await getQuestionsByCategory(id);
    dispatch({
      type: QUESTION_LOAD_BY_CATEGORY_SUCCESS,
      payload: questions
    });
  } catch (err) {
    console.log(err);
  }
};

export const loadCategories = () => async dispatch => {
  try {
    const categories = await getCategories();
    dispatch({
      type: CATEGORIES_LOAD_SUCCESS,
      payload: categories
    });
  } catch (err) {
    console.log(err);
  }
};

export const setAnswer = (question, answerValue) => async dispatch => {
  try {
    const questions = await getQuestions();
    const category = questions.filter(x => x._id === question)[0].category.title;
    const o = await getAnswer(question);
    dispatch({
      type: SET_ANSWER,
      payload: { question: question, category: category, answer: o.answer === answerValue }
    });
  } catch (err) {
    console.log(err);
  }
};
