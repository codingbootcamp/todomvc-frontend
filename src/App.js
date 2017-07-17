import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getAllTodos} from './services/TodoService';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            has_loaded: false
        };

        this.renderAllTodos = this.renderAllTodos.bind(this);
        this.renderTodoCheckbox = this.renderTodoCheckbox.bind(this);
    }

    componentWillMount() {
        getAllTodos().then(todos => {
            this.setState({
                todos,
                has_loaded: true
            });
        });
    }

    renderTodoCheckbox(is_complete) {
        return (
            <input type="checkbox" checked={is_complete}/>
        );
    }

    renderAllTodos() {
        if (!this.state.has_loaded) {
            return (
                <li>
                    Loading... please wait
                </li>
            );
        }
        return this.state.todos.map((todo, index) => {
            return (
                <li key={index}>
                    {this.renderTodoCheckbox(todo.is_complete)}
                    {todo.title}
                </li>
            );
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <ul>
                            {this.renderAllTodos()}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
