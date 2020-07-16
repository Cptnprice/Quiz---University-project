import React from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { loadQuestions, loadCategories } from "../actions/Actions";
import EditCategory from "./EditCategory";

class Main  extends React.Component{
  state = {
    restart : 0,
    edit : 0,
    id : null,
    title : null
  }
  
  async componentDidMount() {
    await this.fetchData();
  }

  fetchData = async () => {
    try {
      await this.props.loadCategories();
    } catch (err) {
      console.log(err);
    }
  }

  handleRemove = async (id) => {
    const response = await fetch('http://localhost:7777/delete-category', {
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
    const response = await fetch('http://localhost:7777/edit-category', {
        method : 'POST',
        headers : {
            'Content-type' : 'application/json',
        },
        body : JSON.stringify({id : data.id, title : data.title})
    })
    const body = await response.text();
    this.setState({edit : 0});
    this.fetchData();
}

  handleEdit = async (id, title) => {
    this.setState({edit : 1, id : id, title : title});
  }
  
  render(){
    return !(this.state.edit) ? <div>
        <h2>Choose Test</h2>
        {
          this.props.categoriesReducer.categories.map((c,i) => {
            let d = "/" + c.title
            return (
              <Row key={c._id}>
                <Col>
                  <Card>
                    <Card.Body>
                      <button type ="button" onClick={()=>this.handleRemove(c._id)} className="btn btn-danger float-right">delete</button>
                      <button type ="button" onClick={()=>this.handleEdit(c._id, c.title)} className="btn btn-primary float-right mr-1">edit</button>
                      <Card.Text>
                        <NavLink to={d}>{c.title}</NavLink>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <br />
                </Col>
            </Row>
            )
          })
        }
      </div> : 
      <div>
        <EditCategory id={this.state.id} title={this.state.title} onEdit={this.handleEditSubmit} />
      </div>
  };
}

function mapStateToProps(state){
  // console.log("state : ", state);
  return state;
}

export default connect(mapStateToProps,{loadQuestions,loadCategories})(Main);
