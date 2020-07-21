import React from 'react';
import { connect } from "react-redux";
import { loadQuestions, loadCategories } from "../actions/Actions";
import { withRouter } from 'react-router';
import { cloneDeep } from 'lodash';

class EditCategory extends React.Component{
    state = {
        id : this.props.id,
        title : this.props.title 
    }

    tempState = cloneDeep(this.state);

    async componentDidMount() {
        try {
          await this.props.loadCategories();
          await this.props.loadQuestions();
        } catch (err) {
          console.log(err);
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name] : value
        })
    }

    handleEdit = async (event) => {
        event.preventDefault();
        this.props.onEdit(this.state);
    }

    onBackClick = () => {
        this.setState(this.tempState);
        this.props.history.push('/');
    };

    render(){
        return <form method="POST" onSubmit={this.handleEdit}>
            <div className="form-group">
                <label htmlFor="title">Edit subject</label>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    id="title"
                    defaultValue={this.props.title}
                    placeholder="Enter subject"
                    required
                    onChange={this.handleChange}
                />
                <button type="submit" className="btn btn-primary mt-2">Edit</button>
                <br></br>
                <button className="btn btn-info btn-sm mt-2" onClick={this.onBackClick}>
                    Go back
                </button>
            </div>
        </form>
    }

}

function mapStateToProps(state){
    return state;
  }
  
export default withRouter(connect(mapStateToProps,{loadQuestions,loadCategories})(EditCategory));