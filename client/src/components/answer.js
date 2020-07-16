import React from "react";

class Answer extends React.Component {
  render() {
    const {
      onHandleAnswer,
      questionId,
      choice: { _id, value }
    } = this.props;
    return (
      <li key={_id}>
        <input
          type="radio"
          name={`answer${questionId}`}
          value={_id}
          style={{ marginRight: "10px" }}
          onClick={() => onHandleAnswer(questionId, _id)}
        />
        {value}
      </li>
    );
  }
}

export default Answer;
