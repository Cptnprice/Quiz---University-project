import React, { Component } from "react";
import { withRouter } from "react-router";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  loadQuestions,
  loadQuestionsByCategory,
  setAnswer,
} from "../actions/Actions";
import Choices from "./choices";
import Result from "./result";
import EditQuestion from "./EditQuestion";

class Questions extends Component {
  state = {
    modalShow: false,
    restart: 0,
    edit : 0,
    id : null,
    question : null,
    choices : null,
    answer : null,
    answerIndex : null,
    category : null
  };

  async componentDidMount() {
    await this.fetchData();
  }

  fetchData = async () => {
    try {
      await this.props.loadQuestionsByCategory(this.props.id);
    } catch (err) {
      console.log(err);
    }
  }

  handleAnswer = async (question, answerValue) => {
    try {
      await this.props.setAnswer(question, answerValue);
    } catch (err) {
      console.log(err);
    }
  };

  handleDone = () => {
    this.setState({ modalShow: true });
  };

  handleClose = () => {
    this.setState({
      modalShow: false,
      restart: Math.random()
    });
  };

  onBackClick = () => {
    this.props.history.goBack();
  };

  handleRemove = async (id) => {
    const response = await fetch('http://localhost:7777/delete-question', {
            method : 'DELETE',
            headers : {
                'Content-type' : 'application/json',
            },
            body : JSON.stringify({
              id : id
            })
        })
        const body = await response.text();
        this.fetchData();
  }

  handleEditSubmit = async (data) => {
    const response = await fetch('http://localhost:7777/edit-question', {
        method : 'POST',
        headers : {
            'Content-type' : 'application/json',
        },
        body : JSON.stringify({
          id : data.id,
          question : data.question,
          choices : data.choices,
          answer : data.answer,
          category : data.category
        })
    })
    const body = await response.text();
    this.setState({edit : 0});
    this.fetchData();
}

  handleEdit = async (id,question,choices,answer,answerIndex,category) => {
    this.setState({ edit : 1, id: id, question : question, choices : choices, answer : answer, answerIndex : answerIndex, category : category})
  }

  render() {
    const questions = this.props.questionsReducer.questions;
    const { answers } = this.props.answersReducer;
    const to = "/result/" + this.props.title;
    return !(this.state.edit) ? <div>
        <div>
          <h1>{this.props.name}</h1>
          <button className="btn btn-info btn-sm" onClick={this.onBackClick}>
            Go back
          </button>
        </div>
        <h2>{this.props.title}</h2>
        {questions &&
          questions.map((q, i) => {
            return (
              <Row key={q._id}>
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        {i+1}
                        <button type ="button" onClick={()=>this.handleRemove(q._id)} className="btn btn-danger float-right">delete</button>
                        <button type ="button" onClick={()=>this.handleEdit(q._id, q.question, q.choices, q.answer, q.choices.findIndex(x => x._id === q.answer._id)+1, q.category)} className="btn btn-primary float-right mr-1">edit</button>
                      </Card.Title>
                      <Card.Text> {q.question}</Card.Text>
                      <Choices
                        key={this.state.restart}
                        question={q}
                        choices={q.choices}
                        handleAnswer={this.handleAnswer}
                      />
                    </Card.Body>
                  </Card>
                  <br />
                </Col>
              </Row>
            );
          })}

        <NavLink to={to}>Finish test</NavLink>

        <Modal show={this.state.modalShow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Result</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Result answers={answers} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <br />
      </div> : 
      <div>
        <EditQuestion id={this.state.id} question={this.state.question} choices={this.state.choices} answer={this.state.answer} category={this.state.category.title} categoryId={this.state.category._id} answerIndex={this.state.answerIndex} onEdit={this.handleEditSubmit} />
      </div>
  }
}

function mapStateToProps(state) {
  return state;
}

export default withRouter(
  connect(mapStateToProps, {
    loadQuestions,
    loadQuestionsByCategory,
    setAnswer
  })(Questions)
);
