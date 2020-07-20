import React from "react";

class Answer extends React.Component {
  render() {
    const {
      onHandleAnswer,
      question,
      choice: { _id, value }
    } = this.props;
    return (
      <li key={_id}>
        <input
          type="radio"
          name={`answer${question._id}`}
          value={_id}
          style={{ marginRight: "10px" }}
          onClick={() => onHandleAnswer(question, _id)}
        />
        {value}
      </li>
    );
  }
}

export default Answer;
