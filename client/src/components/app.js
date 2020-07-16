import React from "react";
import { Route } from "react-router-dom";
import { loadQuestions, loadCategories } from "../actions/Actions";
import Sidebar from "./sidebar";
import Main from "./main";
import Questions from "./questions";
import NewCategory from "./NewCategory";
import NewQuestion from "./NewQuestion";
import Result from "./result";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import "./app.css";

class App extends React.Component{

  async componentDidMount() {
    try {
      await this.props.loadCategories();
    } catch (err) {
      console.log(err);
    }
  }

  render(){
    return (
      <div className="site">
        <Sidebar />
        <div className="content">
          <Route exact path="/" component={Main} />
          <Route path="/result/:category" component={Result} />
          <Route path="/add-new-category" component={NewCategory} />
          <Route path="/add-new-question" component={NewQuestion} />
            {
              this.props.categoriesReducer.categories.map((c,i) => {
                let d="/" + c.title
                return (
                  <Route
                  exact
                  key={c._id}
                  path={d}
                  render={props => <Questions {...props} title={c.title} id={c._id}/>}
                  // component={() => <Questions title={c.title} />}
                />
                )
              })
            }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  // console.log("state : ", state);
  return state;
}

export default connect(mapStateToProps,{loadQuestions,loadCategories})(App);