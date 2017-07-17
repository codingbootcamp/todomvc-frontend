import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/todo.css';
import {getAllTodos, updateTodo} from './services/TodoService';
import Todo from './components/Todo';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            has_loaded: false
        };

        this.renderAllTodos = this.renderAllTodos.bind(this);
        this.handleTodoCheckboxChange = this.handleTodoCheckboxChange.bind(this);
    }

    componentWillMount() {
        getAllTodos().then(todos => {
            this.setState({
                todos,
                has_loaded: true
            });
        });
    }

    handleTodoCheckboxChange(updated_todo) {
        updateTodo(updated_todo).then(updated_todo => {
            const updated_todos = this.state.todos.map(todo => {
                if (todo._id === updated_todo._id) {
                    return updated_todo;
                }
                return todo;
            });
            this.setState({
                todos: updated_todos
            });
        })
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
                <Todo key={index}
                    todo={todo}
                    handleTodoCheckboxChange={this.handleTodoCheckboxChange}/>
            );
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <ul className="todo-list">
                            {this.renderAllTodos()}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
