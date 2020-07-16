const url = 'http://localhost:7777'

export const getQuestions = async () => {
  try {
    return await fetch(`${url}/questions`).then(res =>
      res.json()
    );
  } catch (err) {
    throw err;
  }
};

export const getQuestionsByCategory = async (id) => {
  try {
    return await fetch(`${url}/questions/${id}`).then(res =>
      res.json()
    );
  } catch (err) {
    throw err;
  }
};

export const getCategories = async () => {
  try {
    return await fetch(`${url}/categories`).then(res =>
      res.json()
    );
  } catch (err) {
    throw err;
  }
};

export const getAnswer = async id => {
  try {
    return await fetch(`${url}/answer/${id}`).then(res =>
      res.json()
    );
  } catch (err) {
    throw err;
  }
};
