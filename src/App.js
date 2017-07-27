import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/todo.css';
import {getAllTodos, updateTodo, deleteTodo, saveTodo, filterTodos} from './services/TodoService';
import Todo from './components/Todo';
import Filter from './components/Filter';
import FilterTypes from './constants/FilterTypes';

const default_new_todo = {
    title: '',
    is_saving: false,
    is_visible: false
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            filter_type: FilterTypes.ALL,
            has_loaded: false,
            new_todo: default_new_todo
        };

        this.renderAllTodos = this.renderAllTodos.bind(this);
        this.handleTodoCheckboxChange = this.handleTodoCheckboxChange.bind(this);
        this.toggleTodoEdit = this.toggleTodoEdit.bind(this);
        this.handleTodoChange = this.handleTodoChange.bind(this);
        this.saveUpdatedTodo = this.saveUpdatedTodo.bind(this);
        this.handleTodoDelete = this.handleTodoDelete.bind(this);
        this.handleNewTodoChange = this.handleNewTodoChange.bind(this);
        this.toggleNewTodoEdit = this.toggleNewTodoEdit.bind(this);
        this.handleNewTodoSave = this.handleNewTodoSave.bind(this);
        this.handleFilterTodos = this.handleFilterTodos.bind(this);
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

    toggleNewTodoEdit() {
        this.setState({
            ...this.state,
            new_todo: {
                ...this.state.new_todo,
                is_visible: !this.state.new_todo.is_visible
            }
        })
    }

    handleNewTodoChange(e) {
        const updated_title = e.target.value;
        this.setState({
            ...this.state,
            new_todo: {
                ...this.state.new_todo,
                title: updated_title
            }
        });
    }

    handleNewTodoSave(e) {
        e.preventDefault();

        if (!this.state.new_todo.title.trim().length) {
            this.setState({
                new_todo: default_new_todo
            });
            return;
        };

        this.setState({
            ...this.state,
            new_todo: {
                ...this.state.new_todo,
                is_saving: true
            }
        });
        saveTodo(this.state.new_todo.title).then(new_todo => {
            const todos = [...this.state.todos, new_todo];
            const updated_todos = getTodosWithIsLoadingState(todos);
            this.setState({
                todos: updated_todos,
                new_todo: default_new_todo
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
        const filtered_todos = filterTodos(this.state.todos, this.state.filter_type);

        if (!filtered_todos.length) return (
            <li>
                No todos found!
            </li>
        );

        return filtered_todos.map((todo, index) => {
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

    renderNewTodoForm() {
        if (!this.state.new_todo.is_visible) {
            return null;
        }
        return (
            <form onSubmit={this.handleNewTodoSave}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Add a new todo"
                    value={this.state.new_todo.title}
                    onChange={this.handleNewTodoChange}
                    onBlur={this.handleNewTodoSave}
                    autoFocus={true}
                    readOnly={this.state.new_todo.is_saving}
                />
            </form>
        )
    }

    renderAddTodoButton() {
        if (!this.state.new_todo.is_visible) {
            return (
                <button className="btn btn-primary" onClick={this.toggleNewTodoEdit}>
                    <i className="glyphicon glyphicon-plus-sign"/>
                </button>
            );
        }
        return null;
    }

    handleFilterTodos(filter_type) {
        this.setState({
            filter_type
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="todo-list">
                            {this.renderAddTodoButton()}
                            {this.renderNewTodoForm()}
                            <ul>
                                {this.renderAllTodos()}
                            </ul>
                            <Filter
                                selected_filter_type={this.state.filter_type}
                                handleFilterTodos={this.handleFilterTodos}/>
                        </div>
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
