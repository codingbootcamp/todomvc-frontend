import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/todo.css';
import {getAllTodos, updateTodo, deleteTodo} from './services/TodoService';
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
        this.toggleTodoEdit = this.toggleTodoEdit.bind(this);
        this.handleTodoChange = this.handleTodoChange.bind(this);
        this.saveUpdatedTodo = this.saveUpdatedTodo.bind(this);
        this.handleTodoDelete = this.handleTodoDelete.bind(this);
    }

    componentWillMount() {
        getAllTodos().then(todos => {
            const updated_todos = getTodosWithIsLoadingState(todos);
            this.setState({
                todos: updated_todos,
                has_loaded: true
            });
        });
    }

    updateAffectedTodoLoadingState(updated_todo) {
        const updated_todos = this.state.todos.map(todo => {
            if (todo._id === updated_todo._id) {
                return {
                    ...todo,
                    is_loading: true
                };
            }
            return todo;
        });
        this.setState({
            todos: updated_todos
        });
    }

    handleTodoCheckboxChange(updated_todo) {
        this.updateAffectedTodoLoadingState(updated_todo);

        updateTodo(updated_todo).then(updated_todo => {
            const updated_todos = this.state.todos.map(todo => {
                if (todo._id === updated_todo._id) {
                    return {
                        ...updated_todo,
                        is_loading: false,
                        is_editing: false
                    };
                }
                return todo;
            });
            this.setState({
                todos: updated_todos
            });
        });
    }

    toggleTodoEdit(todo_to_edit) {
        const updated_todos = this.state.todos.map(todo => {
            if (todo._id === todo_to_edit._id) {
                return {
                    ...todo,
                    is_editing: !todo_to_edit.is_editing
                };
            }
            return todo;
        });
        this.setState({
            todos: updated_todos
        });
    }

    handleTodoChange(todo_id, updated_todo_title) {
        const updated_todos = this.state.todos.map(todo => {
            if (todo._id === todo_id) {
                return {
                    ...todo,
                    title: updated_todo_title
                };
            }
            return todo;
        });
        this.setState({
            todos: updated_todos
        });
    }

    saveUpdatedTodo(updated_todo) {
        this.updateAffectedTodoLoadingState(updated_todo);
        updateTodo(updated_todo).then(updated_todo => {
            const updated_todos = this.state.todos.map(todo => {
                if (todo._id === updated_todo._id) {
                    return {
                        ...updated_todo,
                        is_loading: false,
                        is_editing: false
                    };
                }
                return todo;
            });
            this.setState({
                todos: updated_todos
            });
        });
    }

    handleTodoDelete(todo_id) {
        const todo_to_delete = this.state.todos.filter(todo => todo._id === todo_id)[0];
        this.updateAffectedTodoLoadingState(todo_to_delete);
        deleteTodo(todo_id).then(() => {
            const updated_todos = this.state.todos.filter(todo => todo._id !== todo_id);
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
                    handleTodoCheckboxChange={this.handleTodoCheckboxChange}
                    toggleTodoEdit={this.toggleTodoEdit}
                    handleTodoChange={this.handleTodoChange}
                    saveUpdatedTodo={this.saveUpdatedTodo}
                    handleTodoDelete={this.handleTodoDelete}
                />
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

function getTodosWithIsLoadingState(todos) {
    return todos.map(todo => ({...todo, is_loading: false, is_editing: false}));
};
