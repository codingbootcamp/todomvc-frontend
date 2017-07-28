import React, { Component } from 'react';
import PropTypes from 'prop-types';

const default_new_todo = {
    title: ''
};

export default class NewTodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...default_new_todo
        };

        this.handleNewTodoChange = this.handleNewTodoChange.bind(this);
        this.handleNewTodoSave = this.handleNewTodoSave.bind(this);

    }

    handleNewTodoChange(e) {
        const updated_title = e.target.value;
        this.setState({
            title: updated_title
        });
    }

    handleNewTodoSave(e) {
        e.preventDefault();
        this.props.handleNewTodoSave(this.state.title)
    }

    render() {
        return (
            <form onSubmit={this.handleNewTodoSave}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Add a new todo"
                    value={this.state.title}
                    onChange={this.handleNewTodoChange}
                    onBlur={this.handleNewTodoSave}
                    autoFocus={true}
                    readOnly={this.props.is_saving}
                />
            </form>
        )
    }
}

NewTodoForm.propTypes = {
    handleNewTodoSave: PropTypes.func.isRequired,
    is_saving: PropTypes.bool.isRequired
}
