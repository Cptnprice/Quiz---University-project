import React from "react";

class NewCategory extends React.Component{
    state = {
        id : null,
        title : null,
        restart : 0
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name] : value});
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:7777/add-new-category', {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json',
            },
            body : JSON.stringify({title : this.state.title})
        })
        const body = await response.text();
        this.setState({
            restart : Math.random()
        })
    }

    render(){
        return <form method="POST" onSubmit={this.handleSubmit} key={this.state.restart}>
            <div className="form-group">
                <label htmlFor="title">Subject</label>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    id="title"
                    placeholder="Enter subject"
                    required
                    onChange={this.handleChange}
                />
                <button type="submit" className="btn btn-primary mt-2">Add</button>
            </div>
        </form>
    }
}

export default NewCategory;