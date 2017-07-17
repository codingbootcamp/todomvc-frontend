import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/todo.css';
import {getAllTodos} from './services/TodoService';
import Todo from './components/Todo';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            has_loaded: false
        };

        this.renderAllTodos = this.renderAllTodos.bind(this);
    }

    componentWillMount() {
        getAllTodos().then(todos => {
            this.setState({
                todos,
                has_loaded: true
            });
        });
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
                    todo={todo}/>
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
