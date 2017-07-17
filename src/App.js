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
                <tr>
                    <td colSpan={3}>
                        Loading... please wait
                    </td>
                </tr>
            );
        }
        return this.state.todos.map((todo, index) => {
            return (
                <tr key={index}>
                    <td>
                        {todo._id}
                    </td>
                    <td>
                        {todo.title}
                    </td>
                    <td>
                        {todo.is_complete ? 'DONE' : 'PENDING'}
                    </td>
                </tr>
            );
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        ID
                                    </th>
                                    <th>
                                        Todo
                                    </th>
                                    <th>
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderAllTodos()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
