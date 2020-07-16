import React from 'react';
import { connect } from "react-redux";
import { loadQuestions, loadQuestionsByCategory, loadCategories } from "../actions/Actions";
import { withRouter } from 'react-router';

class EditQuestion extends React.Component{
    state = {
        id : this.props.id,
        question : this.props.question,
        choices : this.props.choices,
        answer : this.props.answer,
        category : this.props.category 
    }

    async componentDidMount() {
        try {
          await this.props.loadCategories();
          await this.props.loadQuestionsByCategory(this.props.categoryId);
        } catch (err) {
          console.log(err);
        }
    }

    choiceHandler = (choices,tempData) => {
        let o = choices[tempData.id-1];
        o.value = tempData.value;
        choices[tempData.id-1] = o;
        console.log("choices : ", choices);
        this.setState({choices : choices});
    }

    idHandler = () => {
        let ids = this.props.questionsReducer.questions.map(x => x.id);
        let id = ids.length === 0 ? 1 : Number(ids[ids.length - 1]) + 1;
        this.setState({id : id});
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        if (!this.state.id){
            this.idHandler();
        }
        else if (['1','2','3','4'].includes(name)){
            let tempData = {
                    id : Number(name),
                    value : value
                }
            this.choiceHandler(this.state.choices,tempData)
        }
        else if ( name === "answer" ){
            let tempData = this.state.choices[value-1];
            this.setState({answer : tempData});
        }
        else{
            this.setState({[name] : value});
        }
    }

    handleEdit = async (event) => {
        event.preventDefault();
        console.log("before : ", this.state)
        this.props.onEdit(this.state);
    }

    onBackClick = (categories,title) => {
        this.props.history.push("/" + title);
    };

    render(){
        return <form onSubmit={this.handleEdit}>
            <div className="form-group">
                <label htmlFor="question">Question</label>
                <input
                    type="text"
                    name="question"
                    className="form-control"
                    id="question"
                    placeholder="Enter question"
                    defaultValue={this.props.question}
                    required
                    onChange={this.handleChange}
                />
                <label htmlFor="1">Conjectural answer 1</label>
                <input
                    type="text"
                    name="1"
                    className="form-control"
                    id="1"
                    placeholder="Enter first conjectural answer"
                    defaultValue={this.props.choices[0].value}
                    required
                    onChange={this.handleChange}
                />
                <label htmlFor="2">Conjectural answer 2</label>
                <input
                    type="text"
                    name="2"
                    className="form-control"
                    id="2"
                    placeholder="Enter second conjectural answer"
                    defaultValue={this.props.choices[1].value}
                    required
                    onChange={this.handleChange}
                />
                <label htmlFor="3">Conjectural answer 3</label>
                <input
                    type="text"
                    name="3"
                    className="form-control"
                    id="3"
                    placeholder="Enter third conjectural answer"
                    defaultValue={this.props.choices[2].value}
                    required
                    onChange={this.handleChange}
                />
                <label htmlFor="4">Conjectural answer 4</label>
                <input
                    type="text"
                    name="4"
                    className="form-control"
                    id="4"
                    placeholder="Enter fourth conjectural answer"
                    defaultValue={this.props.choices[3].value}
                    required
                    onChange={this.handleChange}
                />
                <label htmlFor="answer">Correct answer</label>
                <input
                    type="text"
                    name="answer"
                    className="form-control"
                    id="answer"
                    placeholder="Enter correct answer (1-4)"
                    defaultValue={this.props.answerIndex}
                    required
                    onChange={this.handleChange}
                />
                <label htmlFor="category">Subject</label>
                <select name="category" className="form-control" id="category" required onChange={this.handleChange}>
                    <option defaultValue={this.props.category}>{this.props.category}</option>
                    {
                        this.props.categoriesReducer.categories.map((c,i) => {
                            if (this.props.category !== c.title){
                                return (
                                    <option key={c._id} value={c.title}>{c.title}</option>
                                )
                            }
                        })
                    }
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Edit</button>
            <br></br>
            <button className="btn btn-info btn-sm mt-2" onClick={() => this.onBackClick(this.props.categoriesReducer.categories,this.props.category)}>
                Go back
            </button>
    </form>
    }

}

function mapStateToProps(state){
    // console.log("state : ", state);
    return state;
  }
  
export default withRouter(connect(mapStateToProps,{loadQuestions,loadQuestionsByCategory,loadCategories})(EditQuestion));