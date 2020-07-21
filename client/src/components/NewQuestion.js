import React from "react";
import { connect } from "react-redux";
import { loadQuestions, loadCategories } from "../actions/Actions";

class NewQuestion extends React.Component{
    state = {
        question : '',
        choices : [],
        answer : {},
        category : '',
        restart : 0
    }

    async componentDidMount() {
        await this.fetchData();
      }

    fetchData = async () => {
        try {
            await this.props.loadQuestions();
            await this.props.loadCategories();
        } catch (err) {
            console.log(err);
        }
    }

    choiceHandler = (choices,tempData) => {
        let o = choices.filter( x => x.id === tempData.id)[0];
        if (!o){
            choices.push(tempData);
        }
        else{
            let i = choices.indexOf(o);
            choices[i] = tempData;
        }
        this.setState({choices : choices});
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        if (['1','2','3','4'].includes(name)){
            let tempData = {
                    id : Number(name),
                    value : value
                }
            this.choiceHandler(this.state.choices,tempData)
        }
        else if ( name === "answer" ){
            let tempData = this.state.choices[value - 1];
            this.setState({answer : tempData});
        }
        else{
            this.setState({[name] : value});
        }
    }

    saveQuestion = async (event) => {
        event.preventDefault();
        console.log("state before adding question : ", this.state);
        let DataToSend = {
            question : this.state.question,
            choices : this.state.choices,
            answer : this.state.answer,
            category : this.state.category
        };
        const response = await fetch('http://localhost:7777/add-new-question', {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json',
            },
            body : JSON.stringify({question : DataToSend})
        })
        const body = await response;
        this.setState({
            question : '',
            choices : [],
            answer : {},
            category : '',
            restart : Math.random()
        })
        this.fetchData();
    }
    
    render(){
        return <form onSubmit={this.saveQuestion} key={this.state.restart}>
            <div className="form-group">
                <label htmlFor="question">Question</label>
                <input
                    type="text"
                    name="question"
                    className="form-control"
                    id="question"
                    placeholder="Enter question"
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
                    required
                    onChange={this.handleChange}
                />
                <label htmlFor="category">Subject</label>
                <select name="category" className="form-control" id="category" required onChange={this.handleChange}>
                    <option value="" defaultValue>Choose subject</option>
                    {
                        this.props.categoriesReducer.categories.map((c,i) => {
                            return (
                                <option key={c._id} value={c.title}>{c.title}</option>
                            )
                        })
                    }
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Add</button>
        </form>
    }
}


function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps,{loadQuestions,loadCategories})(NewQuestion);