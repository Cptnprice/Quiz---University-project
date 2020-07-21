import React from "react";
import { connect } from "react-redux";

class Result extends React.Component {
  getResult = () => {
    const answers = this.props.answersReducer.answers.filter(answer => answer.category === this.props.match.params.category);
    return answers.length > 0
      ? answers.map(x => (x.answer ? 1 : 0)).reduce((a, b) => a + b)
      : 0;
  };

  render() {
    const answers = this.props.answersReducer.answers.filter(answer => answer.category === this.props.match.params.category);
    const result = this.getResult();
    return (
      <div>
        <ul>
          {answers &&
            answers.map((a, i) => (
              <li key={i}>
                <span>{i+1}</span>
                <span>{a.answer ? " Correct" : " Mistake"}</span>
              </li>
            ))}
        </ul>{" "}
        <hr />
        <h4>You got {result > 1 ? result + " points" : result + " point"}</h4>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {})(Result);
