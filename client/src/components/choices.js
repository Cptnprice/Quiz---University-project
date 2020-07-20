import React from "react";
import Answer from "./answer";

const Choices = props => {
  const { question, choices, handleAnswer } = props;
  return (
    <ul key={question._id}>
      {choices.map(choice => (
        <Answer
          key={choice._id}
          question={question}
          choice={choice}
          onHandleAnswer={handleAnswer}
        />
      ))}
    </ul>
  );
};

export default Choices;
