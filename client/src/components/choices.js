import React from "react";
import Answer from "./answer";

const Choices = props => {
  const { questionId, choices, handleAnswer } = props;
  return (
    <ul key={questionId}>
      {choices.map(choice => (
        <Answer
          key={choice._id}
          questionId={questionId}
          choice={choice}
          onHandleAnswer={handleAnswer}
        />
      ))}
    </ul>
  );
};

export default Choices;
